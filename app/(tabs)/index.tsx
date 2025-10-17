import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import AttendanceScreen from './screens/AttendanceScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';
import StudentsScreen from './screens/StudentsScreen';

// --------------------
// 📘 Type definitions
// --------------------
export type Student = {
  id: string;
  name: string;
  rollNo: string;
  department: string;
};

export type RootStackParamList = {
  Dashboard: undefined;
  StudentDetails: { student: Student };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Students') iconName = 'people';
          else if (route.name === 'Courses') iconName = 'book';
          else if (route.name === 'Attendance') iconName = 'check-circle';
          else if (route.name === 'Profile') iconName = 'person';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: { backgroundColor: '#1E88E5' },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Students" component={StudentsScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root App
export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardTabs}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
  );
}