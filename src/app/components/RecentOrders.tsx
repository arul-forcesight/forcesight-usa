import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const orders = [
  { id: "ORD-1234", customer: "John Smith", product: "Wireless Headphones", amount: "$149.99", status: "completed", date: "2025-03-19" },
  { id: "ORD-1235", customer: "Emma Wilson", product: "Smart Watch", amount: "$299.99", status: "processing", date: "2025-03-19" },
  { id: "ORD-1236", customer: "Michael Brown", product: "Laptop Stand", amount: "$79.99", status: "completed", date: "2025-03-18" },
  { id: "ORD-1237", customer: "Sarah Davis", product: "USB-C Cable", amount: "$19.99", status: "returned", date: "2025-03-18" },
  { id: "ORD-1238", customer: "James Johnson", product: "Mechanical Keyboard", amount: "$159.99", status: "completed", date: "2025-03-17" },
  { id: "ORD-1239", customer: "Lisa Anderson", product: "Webcam HD", amount: "$89.99", status: "processing", date: "2025-03-17" },
];

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  returned: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function RecentOrders() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3>Recent Orders</h3>
        <p className="text-sm text-muted-foreground mt-1">Latest transactions and their status</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[order.status as keyof typeof statusColors]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
