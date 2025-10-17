import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Student = {
  id: string;
  name: string;
  rollNo: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercent: number;
  subjectWise?: { subject: string; percent: number }[];
};

export default function AttendanceScreen() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const students: Student[] = [
    {
      id: "1",
      name: "Amna Ashraf",
      rollNo: "BSCS-01",
      totalClasses: 40,
      attendedClasses: 36,
      attendancePercent: 98,
      subjectWise: [
        { subject: "Mobile Development", percent: 88 },
        { subject: "Parallel Computing", percent: 92 },
        { subject: "AI", percent: 85 },
      ],
    },
    {
      id: "2",
      name: "Ali Haider",
      rollNo: "BSCS-02",
      totalClasses: 40,
      attendedClasses: 32,
      attendancePercent: 90,
      subjectWise: [
        { subject: "Mobile Development", percent: 75 },
        { subject: "Parallel Computing", percent: 82 },
        { subject: "AI", percent: 84 },
      ],
    },
    {
      id: "3",
      name: "Rabia Ahmad",
      rollNo: "BSCS-03",
      totalClasses: 40,
      attendedClasses: 38,
      attendancePercent: 80,
      subjectWise: [
        { subject: "Mobile Development", percent: 93 },
        { subject: "Parallel Computing", percent: 97 },
        { subject: "AI", percent: 95 },
      ],
    },
  ];

  // ✅ Reusable progress bar
  const ProgressBar = ({ percent, color }: { percent: number; color: string }) => (
    <View style={styles.progressContainer}>
     <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );

  // ---------------------------
  // 1️⃣ List view
  // ---------------------------
  if (!selectedStudent) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
        <Text style={styles.header}>📋 Student Attendance</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedStudent(item)}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.roll}>{item.rollNo}</Text>
              </View>

              <ProgressBar percent={item.attendancePercent} color="#2196F3" />
              <Text style={styles.percentText}>{item.attendancePercent}% Attendance</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // ---------------------------
  // 2️⃣ Detail view
  // ---------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedStudent.name}</Text>
      <Text style={styles.meta}>Roll No: {selectedStudent.rollNo}</Text>

      <Text style={styles.sectionTitle}>Overall Attendance</Text>
      <ProgressBar percent={selectedStudent.attendancePercent} color="#4CAF50" />
      <Text style={styles.percentText}>{selectedStudent.attendancePercent}%</Text>

      <Text style={styles.sectionTitle}>Subject-wise Attendance</Text>
      {selectedStudent.subjectWise?.map((subject, index) => (
        <View key={index} style={styles.subjectRow}>
          <Text>{subject.subject}</Text>
          <ProgressBar percent={subject.percent} color="#2196F3" />
          <Text style={styles.percentText}>{subject.percent}%</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="⬅ Back to List" onPress={() => setSelectedStudent(null)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#E3F2FD",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#0D47A1" },
  roll: { fontSize: 14, color: "#1565C0" },
  percentText: { marginTop: 4, color: "#333", fontWeight: "600" },
  progressContainer: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
  },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", color: "#1A237E" },
  meta: { marginTop: 6, color: "#555" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 20 },
  subjectRow: { marginTop: 10 },
});