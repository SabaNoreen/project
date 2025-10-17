import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StudentsScreen() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: "1", name: "Amna Ashraf", rollNo: "BSCS-01", semester: "7th", gpa: 3.5, attendance: 98 },
    { id: "2", name: "Ali Haider", rollNo: "BSCS-02", semester: "7th", gpa: 3.3, attendance: 90},
    { id: "3", name: "Rabia Ahmad", rollNo: "BSCS-03", semester: "7th", gpa: 3.1, attendance: 80 },
    { id: "4", name: "Fiza Arshad", rollNo: "BSCS-04", semester: "7th", gpa: 3.0, attendance: 87 },
    { id: "4", name: "Saba Noreen", rollNo: "BSCS-05", semester: "7th", gpa: 3.4, attendance: 90 },
  ];

  // Reusable progress bar
  const ProgressBar = ({ percent, color }: { percent: number; color: string }) => (
    <View style={styles.progressContainer}>
     <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );

  // 1️⃣ Student List view
  if (!selectedStudent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>👨‍🎓 Student List</Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedStudent(item)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Roll No: {item.rollNo}</Text>
              <Text style={styles.detail}>Semester: {item.semester}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // 2️⃣ Student Detail view
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Student Details</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>
          Name: <Text style={styles.value}>{selectedStudent.name}</Text>
        </Text>
        <Text style={styles.label}>
          Roll No: <Text style={styles.value}>{selectedStudent.rollNo}</Text>
        </Text>
        <Text style={styles.label}>
          Semester: <Text style={styles.value}>{selectedStudent.semester}</Text>
        </Text>

        <Text style={[styles.label, { marginTop: 12 }]}>GPA</Text>
        <ProgressBar percent={(selectedStudent.gpa / 4) * 100} color="#4CAF50" />
        <Text style={styles.percentText}>{selectedStudent.gpa.toFixed(2)} / 4.00</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Attendance</Text>
        <ProgressBar percent={selectedStudent.attendance} color="#2196F3" />
        <Text style={styles.percentText}>{selectedStudent.attendance}%</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedStudent(null)}>
        <Text style={styles.backText}>⬅ Back to Student List</Text>
      </TouchableOpacity>
    </View>
  );
}

// -------------------
// 💅 Styling
// -------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", color: "#0D47A1", marginBottom: 14 },
  card: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#1A237E" },
  detail: { fontSize: 15, color: "#444", marginTop: 4 },
  detailCard: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  label: { fontSize: 16, color: "#333", marginTop: 6 },
  value: { fontWeight: "600", color: "#1B5E20" },
  progressContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 6,
  },
  progressFill: { height: "100%", borderRadius: 8 },
  percentText: { fontSize: 14, fontWeight: "600", color: "#333", marginTop: 4 },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  backText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});