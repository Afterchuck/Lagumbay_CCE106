import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type AttendanceStatus = 'present' | 'absent' | null;

type Student = {
  id: number;
  name: string;
};

const initialStudents: Student[] = [
  { id: 1, name: 'Viany Jones Capirig' },
  { id: 2, name: 'Cesario Am-is Jr.' },
  { id: 3, name: 'Aldrean Lloyd Supe' },
  { id: 4, name: 'John Allen Latoza' },
  { id: 5, name: 'Melody Oracion' },
  { id: 6, name: 'Mary Pearl Bete' },
  { id: 7, name: 'Bryan Rey Ocon' },
  { id: 8, name: 'Malachi Rotersos' },
  { id: 9, name: 'Jecil Orbong' },
  { id: 10, name: 'Mat Chong Tagaca' },
];

export default function Lab08Screen() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [studentName, setStudentName] = useState('');
  const [summary, setSummary] = useState({ present: 0, absent: 0, unmarked: initialStudents.length });
  const nextStudentId = useRef(initialStudents.length + 1);

  useEffect(() => {
    const present = Object.values(attendance).filter((status) => status === 'present').length;
    const absent = Object.values(attendance).filter((status) => status === 'absent').length;

    setSummary({ present, absent, unmarked: students.length - present - absent });
  }, [attendance, students]);

  const setStudentAttendance = (studentId: number, status: Exclude<AttendanceStatus, null>) => {
    setAttendance((currentAttendance) => ({ ...currentAttendance, [studentId]: status }));
  };

  const addStudent = () => {
    const name = studentName.trim();

    if (!name) {
      Alert.alert('Student name required', 'Enter a student name before adding them to the list.');
      return;
    }

    setStudents((currentStudents) => [...currentStudents, { id: nextStudentId.current++, name }]);
    setStudentName('');
  };

  const deleteStudent = (student: Student) => {
    setStudents((currentStudents) => currentStudents.filter((currentStudent) => currentStudent.id !== student.id));
    setAttendance((currentAttendance) => {
      const { [student.id]: _deletedStatus, ...remainingAttendance } = currentAttendance;
      return remainingAttendance;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>September 17, 2026</Text>
          <Text style={styles.title}>Activity Attendance</Text>
          <Text style={styles.subtitle}>Current Activity: React Native Introduction</Text>
        </View>

        <View style={styles.summaryRow}>
          <SummaryCard label="Present" value={summary.present} color="#15803d" />
          <SummaryCard label="Absent" value={summary.absent} color="#b91c1c" />
          <SummaryCard label="Unmarked" value={summary.unmarked} color="#475569" />
        </View>

        <View style={styles.addStudentCard}>
          <Text style={styles.addStudentTitle}>Add a student</Text>
          <View style={styles.addStudentForm}>
            <TextInput
              accessibilityLabel="New student name"
              onChangeText={setStudentName}
              onSubmitEditing={addStudent}
              placeholder="Enter student name"
              placeholderTextColor="#94a3b8"
              returnKeyType="done"
              style={styles.nameInput}
              value={studentName}
            />
            <Pressable
              accessibilityRole="button"
              onPress={addStudent}
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.list}>
          {students.map((student) => {
            const status = attendance[student.id];

            return (
              <View key={student.id} style={styles.studentRow}>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentNumber}>{String(student.id).padStart(2, '0')}</Text>
                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={[styles.status, status === 'present' && styles.presentStatus, status === 'absent' && styles.absentStatus]}>
                      {status ? status[0].toUpperCase() + status.slice(1) : 'Not marked'}
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <AttendanceButton
                    label="Present"
                    selected={status === 'present'}
                    variant="present"
                    onPress={() => setStudentAttendance(student.id, 'present')}
                  />
                  <AttendanceButton
                    label="Absent"
                    selected={status === 'absent'}
                    variant="absent"
                    onPress={() => setStudentAttendance(student.id, 'absent')}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${student.name}`}
                    onPress={() => deleteStudent(student)}
                    style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function AttendanceButton({
  label,
  selected,
  variant,
  onPress,
}: {
  label: string;
  selected: boolean;
  variant: 'present' | 'absent';
  onPress: () => void;
}) {
  const isPresent = variant === 'present';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Mark ${label.toLowerCase()}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.attendanceButton,
        isPresent ? styles.presentButton : styles.absentButton,
        selected && (isPresent ? styles.presentButtonSelected : styles.absentButtonSelected),
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#f8fafc',
    flexGrow: 1,
    padding: 20,
  },
  container: {
    alignSelf: 'center',
    gap: 16,
    maxWidth: 850,
    width: '100%',
  },
  header: {
    backgroundColor: '#1e3a8a',
    borderRadius: 20,
    padding: 24,
  },
  eyebrow: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  subtitle: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  summaryLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  addStudentCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  addStudentTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  addStudentForm: {
    flexDirection: 'row',
    gap: 10,
  },
  nameInput: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderRadius: 9,
    borderWidth: 1,
    color: '#0f172a',
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 9,
    justifyContent: 'center',
    minWidth: 65,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  list: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  studentRow: {
    alignItems: 'center',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  studentDetails: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 11,
  },
  studentNumber: {
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  studentName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  presentStatus: {
    color: '#15803d',
  },
  absentStatus: {
    color: '#b91c1c',
  },
  actions: {
    flexDirection: 'row',
    gap: 7,
  },
  attendanceButton: {
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 70,
    paddingHorizontal: 9,
    paddingVertical: 9,
  },
  presentButton: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  absentButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  presentButtonSelected: {
    backgroundColor: '#15803d',
    borderColor: '#15803d',
  },
  absentButtonSelected: {
    backgroundColor: '#b91c1c',
    borderColor: '#b91c1c',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 60,
    paddingHorizontal: 8,
  },
  deleteButtonText: {
    color: '#c2410c',
    fontSize: 12,
    fontWeight: '800',
  },
  buttonText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.75,
  },
});
