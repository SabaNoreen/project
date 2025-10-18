import React, { useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [showDetails, setShowDetails] = useState(false);

  // Dummy profile data
  const student = {
    name: "Saba Noreen",
    rollNo: "BSCS-05",
    department: "Computer Science",
    semester: "7th",
    gpa: 3.4,
    attendancePercent: 90,
    email: "sabanoreen@example.com",
    phone: "+92 300 1573567",
    skills: ["React Native", "JavaScript", "AI Basics", "Database Design"],
    achievements: ["Honor List",, "Project Award"],
  };

  // Reusable progress bar
  const ProgressBar = ({ percent, color }: { percent: number; color: string }) => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );

  // 1️⃣ Summary view (short info)
  if (!showDetails) {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.roll}>{student.rollNo}</Text>
        </View>

        <Text style={styles.sectionTitle}>📈 Academic Overview</Text>
        <Text style={styles.label}>GPA</Text>
        <ProgressBar percent={(student.gpa / 4) * 100} color="#4CAF50" />
        <Text style={styles.percentText}>{student.gpa.toFixed(2)} / 4.00</Text>

        <Text style={styles.label}>Attendance</Text>
        <ProgressBar percent={student.attendancePercent} color="#2196F3" />
        <Text style={styles.percentText}>{student.attendancePercent}%</Text>

        <View style={{ marginTop: 30 }}>
          <Button title="View Full Profile →" onPress={() => setShowDetails(true)} />
        </View>
      </View>
    );
  }

  // 2️⃣ Detailed Profile view
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>👤 Full Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name: <Text style={styles.value}>{student.name}</Text></Text>
        <Text style={styles.label}>Roll No: <Text style={styles.value}>{student.rollNo}</Text></Text>
        <Text style={styles.label}>Department: <Text style={styles.value}>{student.department}</Text></Text>
        <Text style={styles.label}>Semester: <Text style={styles.value}>{student.semester}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{student.email}</Text></Text>
        <Text style={styles.label}>Phone: <Text style={styles.value}>{student.phone}</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>💡 Skills</Text>
      <FlatList
        data={student.skills}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>{item}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>🏆 Achievements</Text>
      {student.achievements.map((ach, index) => (
        <Text key={index} style={styles.achievement}>
          • {ach}
        </Text>
      ))}

      <View style={{ marginTop: 25 }}>
        <Button title="⬅ Back to Summary" onPress={() => setShowDetails(false)} />
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>✏️ Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

// -------------------
// 💅 Styling
// -------------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  profileHeader: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "700", color: "#1A237E" },
  roll: { fontSize: 16, color: "#555" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0D47A1", marginTop: 20 },
  label: { fontSize: 15, marginTop: 8, color: "#333" },
  value: { fontWeight: "600", color: "#1B5E20" },
  percentText: { marginTop: 4, color: "#333", fontWeight: "600" },
  progressContainer: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 6,
  },
  progressFill: { height: "100%", borderRadius: 8 },
  infoBox: {
    backgroundColor: "#E3F2FD",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  skillBadge: {
    backgroundColor: "#1565C0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 8,
  },
  skillText: { color: "#fff", fontWeight: "600" },
  achievement: { fontSize: 15, marginTop: 6, color: "#333" },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  editText: { color: "#fff", fontWeight: "700" },
});