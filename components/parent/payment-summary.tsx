"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  balance: number;
  lastPayment: string;
  status: string;
}

interface PaymentSummaryProps {
  students: Student[];
}

export function PaymentSummary({ students }: PaymentSummaryProps) {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSpent, setTotalSpent] = useState(195); // Mock data
  const [percentChange, setPercentChange] = useState(0);
  
  // Calculate total balance from all students
  useEffect(() => {
    const balance = students.reduce((total, student) => total + student.balance, 0);
    setTotalBalance(balance);
    
    // Mock calculation for percent change (would come from real data)
    // Positive number means spending increased compared to last month
    setPercentChange(12.5);
  }, [students]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get days remaining in current month
  const getDaysRemaining = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.getDate() - today.getDate();
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatCurrency(totalBalance)}</span>
            <div className={cn(
              "text-xs font-medium flex items-center gap-1",
              percentChange > 0 ? "text-red-600" : "text-green-600"
            )}>
              {percentChange > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3" />
                  {percentChange}%
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3" />
                  {Math.abs(percentChange)}%
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Compared to last month
          </p>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Monthly Spent</p>
            <p className="text-sm font-medium">{formatCurrency(totalSpent)}</p>
          </div>
          
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((totalSpent / 250) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {getDaysRemaining()} days remaining in current month
          </p>
        </div>
        
        <div className="pt-2">
          <p className="text-sm font-medium">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Card className="p-3 flex flex-col items-center justify-center">
              <p className="text-xs text-muted-foreground">Daily Rate</p>
              <p className="text-lg font-bold">{formatCurrency(5.00)}</p>
            </Card>
            <Card className="p-3 flex flex-col items-center justify-center">
              <p className="text-xs text-muted-foreground">Weekly Rate</p>
              <p className="text-lg font-bold">{formatCurrency(25.00)}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}