"use client";

import { motion } from "framer-motion";
import { Printer, RotateCcw, Receipt } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function ReceiptDialog() {
  const { isReceiptOpen, closeReceipt, lastCompletedSale, newOrder } =
    useCart();

  if (!lastCompletedSale) return null;

  const sale = lastCompletedSale;

  const handlePrint = () => {
    window.print();
  };

  const handleNewOrder = () => {
    closeReceipt();
    newOrder();
  };

  return (
    <Dialog open={isReceiptOpen} onOpenChange={handleNewOrder}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Receipt Header */}
          <div className="p-6 pb-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Sale Complete
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {sale.saleNumber}
            </p>
          </div>

          {/* Printable Receipt Content */}
          <div className="receipt-printable px-6 pb-4">
            <div className="bg-muted/30 rounded-xl p-5 space-y-4 border border-border/50">
              {/* Store Info */}
              <div className="text-center">
                <h4 className="text-sm font-bold text-foreground">
                  QuickPOS F&B
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {new Date(sale.createdAt!).toLocaleString("en-AE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Payment: {sale.paymentMethod.toUpperCase()}
                </p>
              </div>

              <Separator />

              {/* Items */}
              <div className="space-y-2">
                {sale.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex-1">
                      <span className="text-foreground">{item.productName}</span>
                      <span className="text-muted-foreground text-xs ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(sale.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">VAT (5%)</span>
                  <span className="font-medium">
                    {formatCurrency(sale.taxAmount)}
                  </span>
                </div>
                <Separator className="my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(sale.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-[10px] text-muted-foreground">
                  Thank you for your visit!
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {sale.saleNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex-1 h-12 rounded-xl"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
            <Button
              onClick={handleNewOrder}
              className="flex-1 h-12 rounded-xl font-bold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
