export const mockUsers = {
  doctor: {
    id: 1,
    username: 'dr.smith',
    email: 'dr.smith@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'doctor'
  },
  admin: {
    id: 2,
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  },
  patient: {
    id: 3,
    username: 'patient',
    email: 'patient@example.com',
    firstName: 'Patient',
    lastName: 'Test',
    role: 'patient'
  }
};

export const mockLoginRequest = {
  doctorCredentials: {
    email: mockUsers.doctor.email,
    password: 'doctor123'
  },
  adminCredentials: {
    email: mockUsers.admin.email,
    password: 'admin123'
  },
  patientCredentials: {
    email: mockUsers.patient.email,
    password: 'patient123'
  }
};

export const mockLoginService = {
  login: (email: string, password: string) => {
    const userMap = {
      [mockUsers.doctor.email]: mockUsers.doctor,
      [mockUsers.admin.email]: mockUsers.admin,
      [mockUsers.patient.email]: mockUsers.patient
    };

    const validPasswords = {
      [mockUsers.doctor.email]: mockLoginRequest.doctorCredentials.password,
      [mockUsers.admin.email]: mockLoginRequest.adminCredentials.password,
      [mockUsers.patient.email]: mockLoginRequest.patientCredentials.password
    };

    if (userMap[email] && password === validPasswords[email]) {
      return Promise.resolve({
        token: 'mock-jwt-token-xyz123',
        user: userMap[email]
      });
    }

    return Promise.reject({ message: 'Invalid credentials' });
  }
};
