"use client";

import { useMemo, useState } from "react";
import { X, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Dialog, DialogContent } from "../ui/dialog";
import { DEFAULT_FILTERS, ITEM_ROWS, PO_LIST } from "./data";

/** Retailer options for the nested PO picker (US market). */
const PO_RETAILERS = ["Walmart", "Kroger", "Costco", "Target"];

/** Number of empty "Custom Filters" selects rendered under the left card. */
const CUSTOM_FILTER_COUNT = 10;

/** Grouping options for the right-hand table. */
const GROUPING_OPTIONS = [
  "Item / UPC",
  "Product ID",
  "Category / segment",
  "Retailer",
];

/**
 * Inventory · "Select Target Items" modal.
 *
 * Two modes:
 *  - `direct` — pick items straight from inventory (o3).
 *  - `po` — replenishment-order lens: adds a "Select PO" control plus
 *    Ordered / Pending Qty columns (o5) and a nested "Select PO For Plans"
 *    radio picker (o6).
 *
 * USA market only: $ currency, "Retailer" (not "Manufacturer"), "OTIF"
 * (not "Fill Rate"). Every figure comes from the deterministic mock data;
 * Helix AI only proposes selections.
 */
export function SelectTargetItems({
  open,
  onOpenChange,
  mode,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "direct" | "po";
  onSave?: (count: number, totalQty: number) => void;
}) {
  // Row-level selection + removal.
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(ITEM_ROWS.map((r) => r.sku)),
  );
  const [removed, setRemoved] = useState<Set<string>>(() => new Set());
  const [search, setSearch] = useState("");
  const [grouping, setGrouping] = useState("Item / UPC");

  // Filter state (so the "Clear filters" links do something meaningful).
  const [defaultFilterValues, setDefaultFilterValues] = useState<
    Record<string, string>
  >({});
  const [customFilterValues, setCustomFilterValues] = useState<string[]>(() =>
    Array.from({ length: CUSTOM_FILTER_COUNT }, () => ""),
  );

  // Nested "Select PO For Plans" modal.
  const [poModalOpen, setPoModalOpen] = useState(false);
  const [chosenPo, setChosenPo] = useState(PO_LIST[0]?.id ?? "");

  // Derived selection figures.
  const activeRows = useMemo(
    () => ITEM_ROWS.filter((r) => !removed.has(r.sku)),
    [removed],
  );
  const selectedRows = useMemo(
    () => activeRows.filter((r) => selected.has(r.sku)),
    [activeRows, selected],
  );
  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? activeRows.filter((r) => r.sku.toLowerCase().includes(q))
      : activeRows;
  }, [activeRows, search]);

  const selectedCount = selectedRows.length;
  const selectedTotalQty = selectedRows.reduce((sum, r) => sum + r.onHand, 0);

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((r) => selected.has(r.sku));

  const toggleRow = (sku: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(sku);
      else next.delete(sku);
      return next;
    });
  };

  const toggleAllVisible = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const r of visibleRows) {
        if (checked) next.add(r.sku);
        else next.delete(r.sku);
      }
      return next;
    });
  };

  const removeRow = (sku: string) => {
    setRemoved((prev) => new Set(prev).add(sku));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(sku);
      return next;
    });
  };

  const handleReset = () => {
    setSelected(new Set(ITEM_ROWS.map((r) => r.sku)));
    setRemoved(new Set());
    setSearch("");
    setGrouping("Item / UPC");
    setDefaultFilterValues({});
    setCustomFilterValues(Array.from({ length: CUSTOM_FILTER_COUNT }, () => ""));
    setChosenPo(PO_LIST[0]?.id ?? "");
  };

  const handleSave = () => {
    onSave?.(selectedCount, selectedTotalQty);
    onOpenChange(false);
  };

  const dummyOptions = (label: string) => [
    `${label} — All`,
    `${label} A`,
    `${label} B`,
    `${label} C`,
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[1120px] sm:max-w-[1120px] max-h-[88vh] p-0 gap-0 flex flex-col overflow-hidden [&>button]:hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-[#eef1f4] p-6 sm:flex-row sm:items-center sm:justify-between shrink-0">
          <h2 className="text-xl font-semibold text-[#0a335c]">
            Select Target Items
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-[#0a335c] hover:text-[#007fff] transition-colors"
            >
              Reset
            </button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#007fff] hover:bg-[#0069d6] text-white"
            >
              Save and Proceed
            </Button>
          </div>
        </div>

        <div className="space-y-6 p-6 flex-1 overflow-y-auto">
          {/* PO selector (po mode only) */}
          {mode === "po" && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-[#0a335c]">
                Select PO
              </span>
              <button
                type="button"
                onClick={() => setPoModalOpen(true)}
                className="flex h-9 w-[240px] items-center justify-between gap-2 rounded-md border border-[#e6e8ea] bg-[#f7f8fb] px-3 text-sm text-[#0a335c] transition-colors hover:bg-[#eef1f4]"
              >
                <span>{chosenPo || "Select a PO"}</span>
                <TrendingUp className="h-4 w-4 text-[#007fff]" />
              </button>
            </div>
          )}

          {/* Body: filters (left) + selected items (right) */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* LEFT — filters card */}
            <div className="min-w-0 rounded-xl border border-[#e6e8ea] bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#0a335c]">Default Filters</h3>
                <button
                  type="button"
                  onClick={() => setDefaultFilterValues({})}
                  className="text-sm font-medium text-[#007fff] hover:text-[#0069d6] transition-colors"
                >
                  Clear filters
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DEFAULT_FILTERS.map((label) => (
                  <Select
                    key={label}
                    value={defaultFilterValues[label] ?? ""}
                    onValueChange={(v) =>
                      setDefaultFilterValues((prev) => ({
                        ...prev,
                        [label]: v,
                      }))
                    }
                  >
                    <SelectTrigger className="bg-[#f7f8fb] text-[#0a335c]">
                      <SelectValue placeholder={label} />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyOptions(label).map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h3 className="font-semibold text-[#0a335c]">Custom Filters</h3>
                <button
                  type="button"
                  onClick={() =>
                    setCustomFilterValues(
                      Array.from({ length: CUSTOM_FILTER_COUNT }, () => ""),
                    )
                  }
                  className="text-sm font-medium text-[#007fff] hover:text-[#0069d6] transition-colors"
                >
                  Clear filters
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {customFilterValues.map((value, i) => (
                  <Select
                    key={i}
                    value={value}
                    onValueChange={(v) =>
                      setCustomFilterValues((prev) =>
                        prev.map((p, idx) => (idx === i ? v : p)),
                      )
                    }
                  >
                    <SelectTrigger className="bg-[#f7f8fb] text-[#0a335c]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                        (opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </div>

            {/* RIGHT — selected items */}
            <div className="space-y-4 min-w-0">
              {/* Grouping + Helix AI */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Select value={grouping} onValueChange={setGrouping}>
                  <SelectTrigger className="w-[220px] bg-[#f7f8fb] text-[#0a335c]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GROUPING_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#007fff] bg-[#e0f0ff] px-3 py-1.5 text-xs font-medium text-[#007fff] transition-colors hover:bg-[#d0e8ff]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Use Helix AI to Select
                </button>
              </div>

              {/* Table card */}
              <div className="rounded-xl border border-[#e6e8ea] bg-white">
                {/* Selected Items header + search */}
                <div className="flex flex-col gap-3 border-b border-[#eef1f4] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-[#0a335c]">
                    Selected Items
                  </h3>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search SKU..."
                    className="sm:w-[260px]"
                  />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#eef1f4] bg-[#f7f8fb] text-left text-[#0a335c]">
                        <th className="w-12 px-4 py-3">
                          <Checkbox
                            checked={allVisibleSelected}
                            onCheckedChange={(c) => toggleAllVisible(c === true)}
                            aria-label="Select all"
                          />
                        </th>
                        <th className="px-4 py-3 font-semibold">Item / UPC</th>
                        <th className="px-4 py-3 font-semibold">
                          On-hand (cases)
                        </th>
                        {mode === "po" && (
                          <>
                            <th className="px-4 py-3 font-semibold">
                              Ordered Qty
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Pending Qty
                            </th>
                          </>
                        )}
                        <th className="w-12 px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={mode === "po" ? 6 : 4}
                            className="px-4 py-8 text-center text-muted-foreground"
                          >
                            No items match your search.
                          </td>
                        </tr>
                      ) : (
                        visibleRows.map((row) => (
                          <tr
                            key={row.sku}
                            className="border-b border-[#eef1f4] last:border-b-0"
                          >
                            <td className="px-4 py-3">
                              <Checkbox
                                checked={selected.has(row.sku)}
                                onCheckedChange={(c) =>
                                  toggleRow(row.sku, c === true)
                                }
                                aria-label={`Select ${row.sku}`}
                              />
                            </td>
                            <td className="px-4 py-3 text-[#0a335c]">
                              {row.sku}
                            </td>
                            <td className="px-4 py-3 text-[#0a335c]">
                              {row.onHand.toLocaleString()}
                            </td>
                            {mode === "po" && (
                              <>
                                <td className="px-4 py-3 text-[#0a335c]">
                                  {row.ordered.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-[#0a335c]">
                                  {row.pending.toLocaleString()}
                                </td>
                              </>
                            )}
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => removeRow(row.sku)}
                                aria-label={`Remove ${row.sku}`}
                                className="text-[#d9534f] transition-opacity hover:opacity-70"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#f7f8fb] font-semibold text-[#0a335c]">
                        <td className="px-4 py-4" />
                        <td className="px-4 py-4">Total: {selectedCount}</td>
                        <td className="px-4 py-4" colSpan={mode === "po" ? 3 : 1}>
                          {selectedTotalQty.toLocaleString()}
                        </td>
                        <td className="px-4 py-4" />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nested "Select PO For Plans" modal */}
        <SelectPoForPlans
          open={poModalOpen}
          onOpenChange={setPoModalOpen}
          initialPo={chosenPo}
          onApply={(poId) => {
            setChosenPo(poId);
            setPoModalOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

/** Nested radio picker for choosing the PO that drives replenishment plans. */
function SelectPoForPlans({
  open,
  onOpenChange,
  initialPo,
  onApply,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPo: string;
  onApply: (poId: string) => void;
}) {
  const [retailer, setRetailer] = useState("Walmart");
  const [selectedPo, setSelectedPo] = useState(initialPo || PO_LIST[0]?.id || "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eef1f4] p-6">
          <h2 className="text-lg font-semibold text-[#0a335c]">
            Select PO For Plans
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="text-muted-foreground transition-opacity hover:opacity-70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {/* Retailer filter */}
          <Select value={retailer} onValueChange={setRetailer}>
            <SelectTrigger className="w-[240px] bg-[#f7f8fb] text-[#0a335c]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PO_RETAILERS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* PO radio table */}
          <RadioGroup
            value={selectedPo}
            onValueChange={setSelectedPo}
            className="gap-0"
          >
            {/* Header row */}
            <div className="grid grid-cols-[40px_1.4fr_1fr_1fr_1fr_0.8fr] items-center gap-2 border-b border-[#eef1f4] px-3 py-2 text-xs font-medium text-muted-foreground">
              <span />
              <span>PO Number</span>
              <span>Retailer</span>
              <span>PO Date</span>
              <span>PO Value</span>
              <span>OTIF</span>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {PO_LIST.map((po) => {
                const isSelected = selectedPo === po.id;
                return (
                  <label
                    key={po.id}
                    htmlFor={`po-${po.id}`}
                    className={
                      "grid cursor-pointer grid-cols-[40px_1.4fr_1fr_1fr_1fr_0.8fr] items-center gap-2 rounded-lg border px-3 py-3 text-sm transition-colors " +
                      (isSelected
                        ? "border-[#007fff] bg-[#eef6ff]"
                        : "border-transparent hover:bg-[#f7f8fb]")
                    }
                  >
                    <RadioGroupItem id={`po-${po.id}`} value={po.id} />
                    <span className="flex items-center gap-2 font-medium text-[#0a335c]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e0f0ff] text-[#007fff]">
                        <TrendingUp className="h-3.5 w-3.5" />
                      </span>
                      {po.id}
                    </span>
                    <span className="text-[#0a335c]">{po.retailer}</span>
                    <span className="text-muted-foreground">{po.date}</span>
                    <span className="font-medium text-[#1f9d55]">{po.value}</span>
                    <span className="text-[#0a335c]">{po.otif}</span>
                  </label>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-[#eef1f4] p-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#0a335c]">
            {selectedPo ? "1 PO selected" : "0 PO selected"}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedPo("")}
              className="text-sm font-medium text-[#0a335c] hover:text-[#007fff] transition-colors"
            >
              Clear All
            </button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => onApply(selectedPo || PO_LIST[0]?.id || "")}
              className="bg-[#007fff] hover:bg-[#0069d6] text-white"
            >
              Apply &amp; Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
