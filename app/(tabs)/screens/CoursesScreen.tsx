import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Course = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  creditHours: number;
  gradePercent: number;
  attendancePercent: number;
  gradeBreakdown?: { name: string; percent: number }[];
};

export default function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: "1",
      title: "Mobile Development",
      code: "Course_code: 411",
      instructor: "Dur-e-Subhani",
      creditHours: 3,
      gradePercent: 88,
      attendancePercent: 95,
      gradeBreakdown: [
        { name: "Midterm", percent: 30 },
        { name: "Final", percent: 40 },
        { name: "Assignments", percent: 20 },
        { name: "Quizzes", percent: 10 },
      ],
    },
    {
      id: "2",
      title: "Parallel Computing",
      code: "Course-code: 301",
      instructor: "Hina Ghilani",
      creditHours: 3,
      gradePercent: 81,
      attendancePercent: 89,
      gradeBreakdown: [
        { name: "Midterm", percent: 25 },
        { name: "Final", percent: 45 },
        { name: "Lab", percent: 20 },
        { name: "Homeworks", percent: 10 },
      ],
    },
  ];

  // progress bar
  const ProgressBar = ({ percent, color }: { percent: number; color: string }) => (
    <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );

  // ---------------------------
  // 1️⃣ If no course selected → show list
  // ---------------------------
  if (!selectedCourse) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.header}>📘 Courses</Text>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedCourse(item)}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.code}>{item.code}</Text>
              </View>
              <Text style={styles.instructor}>
                {item.instructor} • {item.creditHours} CH
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // ---------------------------
  // 2️⃣ If a course is selected → show details
  // ---------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedCourse.title} <Text style={styles.code}>({selectedCourse.code})</Text>
      </Text>
      <Text style={styles.meta}>
        Instructor: {selectedCourse.instructor} • {selectedCourse.creditHours} CH
      </Text>

      <Text style={styles.sectionTitle}>Grade Progress</Text>
      <ProgressBar percent={selectedCourse.gradePercent} color="#4CAF50" />
      <Text style={styles.percentText}>{selectedCourse.gradePercent}%</Text>

      <Text style={styles.sectionTitle}>Attendance</Text>
      <ProgressBar percent={selectedCourse.attendancePercent} color="#2196F3" />
      <Text style={styles.percentText}>{selectedCourse.attendancePercent}%</Text>

      <Text style={styles.sectionTitle}>Grade Breakdown</Text>
      {selectedCourse.gradeBreakdown?.map((item, index) => (
        <View key={index} style={styles.breakdownRow}>
          <Text>{item.name}</Text>
          <Text style={{ fontWeight: "700" }}>{item.percent}%</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="⬅ Back to List" onPress={() => setSelectedCourse(null)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "700", color: "#1565C0", marginBottom: 10 },
  card: {
    backgroundColor: "#E3F2FD",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#1B5E20" },
  code: { fontSize: 14, color: "#2E7D32" },
  instructor: { marginTop: 6, color: "#555" },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  meta: { color: "#555", marginVertical: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 20 },
  progressContainer: {
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
  },
  percentText: { fontSize: 14, fontWeight: "700", color: "#333", marginTop: 4 },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
  },
});