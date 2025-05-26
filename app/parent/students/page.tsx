"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, UserPlus, Search, CircleDollarSign, Pencil, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StudentsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock student data
  const [students, setStudents] = useState([
    { 
      id: '1', 
      name: 'Alex Johnson', 
      grade: '5', 
      school: 'Lincoln Elementary', 
      balance: 45.00, 
      lastPayment: '2023-09-01', 
      status: 'active',
      dietary: ['Peanut Allergy', 'Vegetarian'],
      studentId: 'S12345'
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      grade: '3', 
      school: 'Lincoln Elementary', 
      balance: 15.50, 
      lastPayment: '2023-09-05', 
      status: 'active',
      dietary: [],
      studentId: 'S12346'
    }
  ]);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  // Filter students based on search
  const filteredStudents = students.filter(student => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
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
    <div className="container py-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/parent/dashboard">
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Students</h1>
        </div>
        <Link href="/parent/students/link">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Link New Student
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Student Profiles</CardTitle>
              <CardDescription>
                Manage your children's lunch accounts
              </CardDescription>
            </div>
            
            <div className="relative w-full sm:w-auto max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-28 bg-muted animate-pulse rounded-md" />
              <div className="h-28 bg-muted animate-pulse rounded-md" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <p className="mt-2 text-muted-foreground">No students found</p>
              <Link href="/parent/students/link" className="mt-4 inline-block">
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Link a Student
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredStudents.map((student) => (
                <div 
                  key={student.id}
                  className="border rounded-lg overflow-hidden transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border">
                        <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-lg">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {student.studentId} • Grade {student.grade}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.school}
                            </p>
                          </div>
                          <div>
                            <Badge variant={student.status === 'active' ? "default" : "outline"} className="mb-2">
                              {student.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="border rounded p-3">
                        <p className="text-xs text-muted-foreground">Balance</p>
                        <p className="text-lg font-semibold">{formatCurrency(student.balance)}</p>
                      </div>
                      <div className="border rounded p-3">
                        <p className="text-xs text-muted-foreground">Dietary Needs</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.dietary.length === 0 ? (
                            <p className="text-sm">None</p>
                          ) : (
                            student.dietary.map((diet, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {diet}
                              </Badge>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Link href={`/parent/payments/make?student=${student.id}`} className="flex-1">
                        <Button variant="default" className="w-full">
                          <CircleDollarSign className="h-4 w-4 mr-2" />
                          Add Funds
                        </Button>
                      </Link>
                      <Link href={`/parent/students/${student.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Pencil className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}