"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Landmark,
  Check,
  ArrowLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatCurrency, cn } from "@/lib/utils";
import { PaymentMethod } from "@/types";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    id: "cash",
    label: "CASH",
    icon: Banknote,
    description: "Pay with cash",
  },
  {
    id: "card",
    label: "CARD",
    icon: CreditCard,
    description: "Debit or credit card",
  },
  {
    id: "credit",
    label: "CREDIT",
    icon: Landmark,
    description: "Charge to account",
  },
];

export default function CheckoutDialog() {
  const {
    items,
    orderNumber,
    subtotal,
    taxAmount,
    totalAmount,
    isCheckoutOpen,
    closeCheckout,
    completeSale,
  } = useCart();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmPayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsProcessing(false);
    setIsSuccess(true);

    // Show success animation then complete
    setTimeout(() => {
      completeSale(selectedMethod);
      setSelectedMethod(null);
      setIsSuccess(false);
    }, 1500);
  };

  const handleClose = () => {
    if (!isProcessing && !isSuccess) {
      closeCheckout();
      setSelectedMethod(null);
    }
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            // ============================================================
            // SUCCESS STATE
            // ============================================================
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-16 px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Check className="w-10 h-10 text-emerald-600" />
                </motion.div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-foreground"
              >
                Payment Successful!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mt-2"
              >
                {formatCurrency(totalAmount)} received via{" "}
                {selectedMethod?.toUpperCase()}
              </motion.p>

              {/* Decorative dots / confetti */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute w-3 h-3 rounded-full",
                    [
                      "bg-blue-400",
                      "bg-emerald-400",
                      "bg-amber-400",
                      "bg-pink-400",
                      "bg-violet-400",
                      "bg-cyan-400",
                      "bg-orange-400",
                      "bg-red-400",
                    ][i]
                  )}
                />
              ))}
            </motion.div>
          ) : (
            // ============================================================
            // CHECKOUT FORM
            // ============================================================
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="p-6 pb-4">
                <DialogTitle className="text-lg font-bold">
                  Complete Payment
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Order {orderNumber}
                </p>
              </DialogHeader>

              <div className="px-6 pb-6 space-y-5">
                {/* Order Summary */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name}{" "}
                        <span className="text-xs">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">VAT (5%)</span>
                    <span className="font-medium">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Select Payment Method
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedMethod === method.id;
                      return (
                        <motion.button
                          key={method.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMethod(method.id)}
                          className={cn(
                            "relative flex flex-col items-center gap-2 py-5 px-3 rounded-xl border-2 transition-all duration-200",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border bg-white hover:border-primary/30 hover:bg-muted/50"
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </motion.div>
                          )}
                          <Icon
                            className={cn(
                              "w-7 h-7 transition-colors",
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-bold transition-colors",
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            {method.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {method.description}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={isProcessing}
                    className="flex-1 h-12 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    disabled={!selectedMethod || isProcessing}
                    className="flex-[2] h-12 rounded-xl text-base font-bold disabled:opacity-40"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      `Confirm ${formatCurrency(totalAmount)}`
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
