export const initDemoUser = () => {
  const existingUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
  
  // Only add demo user if no users exist
  if (existingUsers.length === 0) {
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@makario.com',
      password: 'demo123',
      phone: '9876543210',
      address: '123 Makhana Street',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800001',
      createdAt: new Date().toISOString(),
    };
    
    existingUsers.push(demoUser);
    localStorage.setItem('makario_users', JSON.stringify(existingUsers));
  }
};
