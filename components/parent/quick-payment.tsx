"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CircleDollarSign } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  balance: number;
  lastPayment: string;
  status: string;
}

interface QuickPaymentProps {
  students: Student[];
}

export function QuickPayment({ students }: QuickPaymentProps) {
  const [student, setStudent] = useState<string>('');
  const [paymentType, setPaymentType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const paymentOptions = [
    { id: 'daily', label: 'Daily - $5.00', amount: 5.00 },
    { id: 'weekly', label: 'Weekly - $25.00', amount: 25.00 },
    { id: 'monthly', label: 'Monthly - $85.00', amount: 85.00 },
  ];

  const handleQuickPay = () => {
    if (!student || !paymentType) {
      toast({
        title: "Missing information",
        description: "Please select both a student and payment type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Payment initiated",
        description: "You'll be redirected to complete your payment",
      });
      
      // In a real app, this would redirect to the Stripe payment page
      window.location.href = `/parent/payments/checkout?student=${student}&type=${paymentType}`;
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Select
          value={student}
          onValueChange={setStudent}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={paymentType}
          onValueChange={setPaymentType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment type" />
          </SelectTrigger>
          <SelectContent>
            {paymentOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleQuickPay}
        disabled={isLoading || !student || !paymentType}
      >
        {isLoading ? (
          <span className="flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4 animate-spin" />
            Processing...
          </span>
        ) : (
          'Pay Now'
        )}
      </Button>
    </div>
  );
}