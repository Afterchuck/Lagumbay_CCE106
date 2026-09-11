export const student = {
  id: '141683',
  name: 'Johnrie Lagumbay',
  program: 'Bachelor of Science in Information Technology',
  year: '3rd year',
  email: 'j.lagumbay.141683.tc@umindanao.edu.ph',
  adviser: 'LJ Orcullo',
};

export const courses = [
  {
    id: 'cce106',
    code: '2063',
    title: 'CCE106 - Application Development And Emerging Technologies',
    instructor: 'Prof. LJ Orcullo',
    schedule: 'Mon-Fri, 10:00 AM - 12:00 PM',
    progress: '8 of 12 modules complete',
    color: '#0F8A9D',
  },
  {
    id: 'it11',
    code: '2015',
    title: 'IT11/L - Networking 2',
    instructor: 'Prof. Xian Cadiogan',
    schedule: 'Mon-Fri, 1:30 PM - 3:30PM',
    progress: '6 of 10 modules complete',
    color: '#D97706',
  },
  {
    id: 'it12',
    code: '2034',
    title: 'IT12 - Systems Integration & Architecture',
    instructor: 'Prof. Genrhey Barba',
    schedule: 'Tue-Sat, 3:30 PM - 5:30PM',
    progress: '7 of 9 modules complete',
    color: '#7C3AED',
  },
] as const;

export type Course = (typeof courses)[number];
