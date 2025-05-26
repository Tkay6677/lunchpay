"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CircleDollarSign } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  balance: number;
  lastPayment: string;
  status: string;
}

interface UpcomingPaymentsProps {
  students: Student[];
}

export function UpcomingPayments({ students }: UpcomingPaymentsProps) {
  // Simulate upcoming payments
  const upcomingPayments = [
    {
      id: '1',
      date: '2023-09-25',
      amount: 25.00,
      type: 'Weekly',
      student: 'Alex Johnson',
      status: 'upcoming'
    },
    {
      id: '2',
      date: '2023-09-18',
      amount: 25.00,
      type: 'Weekly',
      student: 'Sarah Johnson',
      status: 'upcoming'
    },
    {
      id: '3',
      date: '2023-10-01',
      amount: 85.00,
      type: 'Monthly',
      student: 'Alex Johnson',
      status: 'upcoming'
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {upcomingPayments.length === 0 ? (
        <div className="text-center py-8">
          <CircleDollarSign className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <p className="mt-2 text-muted-foreground">No upcoming payments</p>
        </div>
      ) : (
        <div className="space-y-2">
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">{payment.student}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{payment.type} plan</span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(payment.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{formatCurrency(payment.amount)}</p>
                <Badge variant="outline" className="ml-2">
                  Upcoming
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}