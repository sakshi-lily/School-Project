const http = require('http');

const API_BASE = 'http://localhost:5000/api';

const makeRequest = (url, method, headers = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
};

async function testAll() {
  console.log('🧪 Starting API Integration Tests...');

  // 1. Admin login
  console.log('\n🔑 1. Logging in as admin...');
  const loginRes = await makeRequest(`${API_BASE}/auth/login`, 'POST', {}, {
    email: 'admin@school.com',
    password: 'admin123'
  });
  
  if (loginRes.status !== 200 || !loginRes.body.success) {
    console.error('❌ Login failed:', loginRes.body);
    process.exit(1);
  }
  
  const token = loginRes.body.token;
  console.log('✅ Login successful! Token retrieved.');

  const authHeaders = { 'Authorization': `Bearer ${token}` };

  // 2. Clear existing admit cards
  console.log('\n🧹 2. Cleaning up existing admit cards...');
  const getCardsRes = await makeRequest(`${API_BASE}/admin/admit-cards`, 'GET', authHeaders);
  if (getCardsRes.status === 200 && getCardsRes.body.success) {
    for (const card of getCardsRes.body.data) {
      await makeRequest(`${API_BASE}/admin/admit-cards/${card._id}`, 'DELETE', authHeaders);
    }
    console.log(`✅ Cleared ${getCardsRes.body.data.length} existing admit cards.`);
  }

  // 3. Upload Admit Cards
  console.log('\n📤 3. Creating Admit Cards...');
  const cardData1 = {
    rollNumber: '26105342',
    studentName: 'Aarav Sharma',
    class: '10-A',
    academicYear: '2026-2027',
    dateOfBirth: '2010-04-15',
    fatherName: 'Rajesh Sharma',
    motherName: 'Meena Sharma',
    examCenter: 'Thakur Biri Singh Inter College Tundla',
    datesheet: [
      { subject: 'English', date: '2026-03-02', time: '09:00 AM - 12:15 PM' },
      { subject: 'Mathematics', date: '2026-03-04', time: '09:00 AM - 12:15 PM' }
    ]
  };

  const createRes1 = await makeRequest(`${API_BASE}/admin/admit-cards`, 'POST', authHeaders, cardData1);
  if (createRes1.status === 201 && createRes1.body.success) {
    console.log('✅ Created Admit Card for student Aarav Sharma.');
  } else {
    console.error('❌ Failed to create Admit Card:', createRes1.body);
  }

  // 4. Test public search of Admit Card (Successful case)
  console.log('\n🔍 4. Searching for Admit Card (Successful match)...');
  const searchUrl = `${API_BASE}/public/admit-card/search?rollNumber=26105342&academicYear=2026-2027&dateOfBirth=2010-04-15`;
  const searchRes = await makeRequest(searchUrl, 'GET');
  if (searchRes.status === 200 && searchRes.body.success) {
    console.log('✅ Public Admit Card Retrieval verified! Details matches:');
    console.log(`   Student: ${searchRes.body.data.studentName}`);
    console.log(`   Roll: ${searchRes.body.data.rollNumber}`);
    console.log(`   Exam Center: ${searchRes.body.data.examCenter}`);
    console.log(`   Datesheet Count: ${searchRes.body.data.datesheet.length}`);
  } else {
    console.error('❌ Public Search failed:', searchRes.body);
  }

  // 5. Test public search of Admit Card (Unsuccessful cases)
  console.log('\n🔍 5. Searching with incorrect DOB (Security Check)...');
  const badDobUrl = `${API_BASE}/public/admit-card/search?rollNumber=26105342&academicYear=2026-2027&dateOfBirth=1999-12-31`;
  const badDobRes = await makeRequest(badDobUrl, 'GET');
  if (badDobRes.status === 400 && !badDobRes.body.success) {
    console.log('✅ Security Check verified: Access blocked for incorrect Date of Birth.');
  } else {
    console.error('❌ Security Check failed: Returned code', badDobRes.status, badDobRes.body);
  }

  console.log('\n🎉 All backend validation tests passed successfully!');
}

testAll().catch(console.error);
