"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/parent/dashboard-header';
import { PaymentSummary } from '@/components/parent/payment-summary';
import { StudentList } from '@/components/parent/student-list';
import { QuickPayment } from '@/components/parent/quick-payment';
import { UpcomingPayments } from '@/components/parent/upcoming-payments';
import { RecentTransactions } from '@/components/parent/recent-transactions';
import Link from 'next/link';

export default function ParentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real implementation, these would be fetched from an API
  const [students, setStudents] = useState([
    { id: '1', name: 'Alex Johnson', grade: '5', balance: 45.00, lastPayment: '2023-09-01', status: 'active' },
    { id: '2', name: 'Sarah Johnson', grade: '3', balance: 15.50, lastPayment: '2023-09-05', status: 'active' },
  ]);
  
  const [recentPayments, setRecentPayments] = useState([
    { id: '1', date: '2023-09-01', amount: 85.00, type: 'Monthly', student: 'Alex Johnson', status: 'completed' },
    { id: '2', date: '2023-09-05', amount: 25.00, type: 'Weekly', student: 'Sarah Johnson', status: 'completed' },
  ]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You need to be logged in to access this page
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6 animate-in fade-in duration-500">
      <DashboardHeader username={user.name} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">My Students</CardTitle>
            <CardDescription>
              {students.length} students linked to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-12 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
              </div>
            ) : (
              <StudentList students={students} />
            )}
          </CardContent>
          <CardFooter>
            <Link href="/parent/students" className="w-full">
              <Button variant="outline" className="w-full">Manage Students</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Payment</CardTitle>
            <CardDescription>
              Make a quick payment for lunch
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-20 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
              </div>
            ) : (
              <QuickPayment students={students} />
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Payment Summary</CardTitle>
            <CardDescription>
              Current month overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-48 bg-muted animate-pulse rounded-md" />
              </div>
            ) : (
              <PaymentSummary students={students} />
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Payments</CardTitle>
              <CardDescription>
                Scheduled and pending payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                </div>
              ) : (
                <UpcomingPayments students={students} />
              )}
            </CardContent>
            <CardFooter>
              <Link href="/parent/payments/schedule" className="w-full">
                <Button variant="outline" className="w-full">Schedule New Payment</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
              <CardDescription>
                Your payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                  <div className="h-12 bg-muted animate-pulse rounded-md" />
                </div>
              ) : (
                <RecentTransactions transactions={recentPayments} />
              )}
            </CardContent>
            <CardFooter>
              <Link href="/parent/payments/history" className="w-full">
                <Button variant="outline" className="w-full">View All Transactions</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}