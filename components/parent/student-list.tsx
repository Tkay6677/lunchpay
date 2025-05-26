"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign } from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  grade: string;
  balance: number;
  lastPayment: string;
  status: string;
}

interface StudentListProps {
  students: Student[];
}

export function StudentList({ students }: StudentListProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Format balance
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-3">
      {students.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No students linked to your account</p>
          <Link href="/parent/students/link">
            <span className="text-blue-600 hover:underline mt-2 inline-block">Link a student</span>
          </Link>
        </div>
      ) : (
        students.map((student) => (
          <Link 
            href={`/parent/students/${student.id}`} 
            key={student.id}
            className="block"
          >
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">Grade {student.grade}</p>
                  </div>
                  <Badge variant={student.balance > 20 ? "default" : "outline"} className="ml-2 flex-shrink-0">
                    {formatCurrency(student.balance)}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}