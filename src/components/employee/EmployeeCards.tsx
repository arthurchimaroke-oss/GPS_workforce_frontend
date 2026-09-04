import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Coffee,
  Briefcase,
  Users,
  FileText,
  Bell,
  Target,
  Award,
  BookOpen
} from "lucide-react";

interface AttendanceCardProps {
  isClockedIn: boolean;
  todaysHours: number;
  onClockToggle: () => void;
}

export const AttendanceCard = ({ isClockedIn, todaysHours, onClockToggle }: AttendanceCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-800">Clock Status</p>
            <p className="text-2xl font-bold text-green-900">
              {isClockedIn ? "IN" : "OUT"}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Today's Hours: {todaysHours}h
            </p>
          </div>
          <Button
            onClick={onClockToggle}
            size="sm"
            className={`${
              isClockedIn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isClockedIn ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Clock Out
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Clock In
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "secondary";
}

export const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  variant = "default"
}: QuickActionCardProps) => {
  const variantClasses = {
    default: "hover:shadow-md",
    primary: "bg-primary/5 border-primary/20 hover:bg-primary/10",
    secondary: "bg-secondary hover:bg-secondary/80"
  };

  return (
    <Card className={`transition-shadow cursor-pointer ${variantClasses[variant]}`} onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-muted rounded-lg">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  progress?: number;
}

export const EmployeeStatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs text-muted-foreground">
            <span className={trend.positive ? "text-green-600" : "text-red-600"}>
              {trend.value}
            </span>
          </p>
        )}
        {progress !== undefined && (
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  type?: "success" | "info" | "warning" | "default";
}

export const ActivityItem = ({ icon, title, timestamp, type = "default" }: ActivityItemProps) => {
  const typeColors = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-orange-500",
    default: "bg-gray-500"
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 ${typeColors[type]} rounded-full flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
      <div className="text-muted-foreground">{icon}</div>
    </div>
  );
};

interface EventCardProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  type?: "meeting" | "deadline" | "event" | "reminder";
}

export const EventCard = ({ icon, title, time, type = "event" }: EventCardProps) => {
  const typeColors = {
    meeting: "bg-blue-100 text-blue-600",
    deadline: "bg-red-100 text-red-600",
    event: "bg-green-100 text-green-600",
    reminder: "bg-orange-100 text-orange-600"
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 ${typeColors[type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
};

interface PerformanceCardProps {
  score: number;
  grade: string;
  period: string;
  metrics?: Array<{
    label: string;
    value: number;
    max: number;
  }>;
}

export const PerformanceCard = ({ score, grade, period, metrics }: PerformanceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Performance Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{score}%</div>
          <Badge variant="secondary" className="mt-1">{grade}</Badge>
          <p className="text-xs text-muted-foreground mt-1">{period}</p>
        </div>

        {metrics && (
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{metric.label}</span>
                  <span>{metric.value}/{metric.max}</span>
                </div>
                <Progress value={(metric.value / metric.max) * 100} className="h-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface LearningCardProps {
  courses: Array<{
    title: string;
    progress: number;
    dueDate?: string;
  }>;
}

export const LearningCard = ({ courses }: LearningCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          Learning & Development
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{course.title}</p>
              <span className="text-xs text-muted-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            {course.dueDate && (
              <p className="text-xs text-muted-foreground">Due: {course.dueDate}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
//             <Progress value={course.progress} className="h-2" />
//             {course.dueDate && (
//               <p className="text-xs text-muted-foreground">Due: {course.dueDate}</p>
//             )}
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };