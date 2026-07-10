# Thakur Biri Singh Inter College - Portal User Guide

Welcome to the official School Management System for **Thakur Biri Singh Inter College (Tundla, Firozabad | UP Board)**. This guide provides detailed setup instructions, login credentials, and step-by-step walkthroughs for all features across our administrative, teacher, and public platforms.

---

## 🏗️ Project Architecture & Service Ports

The project is structured as a monorepo featuring three frontends and a shared backend API.

| Module | Purpose | URL |
| :--- | :--- | :--- |
| **Backend API** | Shared Node.js/Express database controller | `http://localhost:5000` |
| **Landing Page** | Public portal for parents, students, and inquiries | `http://localhost:5173` |
| **Admin Portal** | Management platform for school directors | `http://localhost:5174` |
| **Teacher Portal** | Gradebook and notices desk for educators | `http://localhost:5175` |

---

## 🔑 Login & Test Credentials

Use the following seeded accounts to log in and test features:

### 1. Admin Portal (`http://localhost:5174`)
* **Username**: `admin`
* **Password**: `admin123`
* *(Alternate Email login: `admin@school.com`)*

### 2. Teacher Portal (`http://localhost:5175`)
* **Username**: `teacher`
* **Password**: `teacher123`
* *(Alternate Email login: `teacher@school.com`)*

### 3. Student/Result Verification Details (Seeded Test Data)
Use these roll numbers and details to test the public result checking portal:
* **Student 1**:
  - Roll Number: `26105342`
  - Date of Birth: `2010-04-15` (Format: `YYYY-MM-DD`)
  - Class: `10-A`
  - Academic Year: `2026-2027`
* **Student 2**:
  - Roll Number: `26105343`
  - Date of Birth: `2010-08-22` (Format: `YYYY-MM-DD`)
  - Class: `10-A`
  - Academic Year: `2026-2027`
* **Student 3**:
  - Roll Number: `26105344`
  - Date of Birth: `2008-11-05` (Format: `YYYY-MM-DD`)
  - Class: `12-A`
  - Academic Year: `2026-2027`

---

## 📘 Step-by-Step Guide for Public Landing Page (`http://localhost:5173`)

### 1. Submit an Admission Inquiry
1. Scroll down to the **Admissions Section** or click **Apply Online / Admission Inquiry** in the navigation bar.
2. Complete the form with the following details:
   - Parent/Guardian Name
   - Contact Phone Number & Email Address
   - Student's Name
   - Academic Year (`2026-2027`)
   - Class Grade Applied For (e.g. `10` or `12`)
   - Additional details/remarks
3. Click **Submit Admission Inquiry**. A confirmation alert will appear, and the inquiry will immediately populate in the Admin Dashboard under the "Inquiries" section.

### 2. Submit a General Contact Form
1. Scroll down to the **Contact Us** section.
2. Fill out your Name, Email, Subject, and Message.
3. Click **Send Message**. This submissions data propagates directly to the "Inquiries" section in the Admin Dashboard.

### 3. Check Student Board & Term Results
1. Click **Check Result** in the top navigation bar or the Hero banner button.
2. In the **Public Result Verification Portal** modal, enter the details exactly as registered:
   - **Student Roll Number**: e.g., `26105342`
   - **Academic Year**: Select `2026-2027` from the dropdown list.
   - **Date of Birth**: Enter the student's date of birth in `YYYY-MM-DD` format (e.g., `2010-04-15`).
   - **Security Captcha**: Type the random letters displayed next to the text field. (Note: Captchas are case-sensitive; click the refresh icon next to the captcha image to generate a new one if it is difficult to read.)
3. Click **Search Results**.
4. The verified Academic Statement of Marks will load showing:
   - Student details (Name, Class, Roll Number).
   - Breakdown of marks obtained per subject, total marks, percentage, grade, and Pass/Fail status.
   - Click the **Print Marksheet (PDF)** button at the top right of the screen (highlighted in emerald green).
   - Choose **Save as PDF** or select your connected printer.
   - Set the orientation to **Portrait** and margins to **Default** to ensure it prints as a clean, single-page document.

### 4. Check Notice Board / Academic Calendar
- **Notice Board**: Scroll to the notices section. Click category tabs (Latest News, Circulars, Exam Updates, Events) to view official circulars.
- **Academic Calendar**: Click **Academic Calendar** in the navigation menu to open a popup view displaying active school events and holidays.

### 5. Download Admit Cards
1. Click **Admit Card** in the Quick Services grid.
2. Enter the student's Roll Number (e.g. `26105342`), select the Academic Year (e.g. `2026-2027`), and enter their Date of Birth (e.g. `2010-04-15`).
3. Solve the visual security CAPTCHA code and click **Download Admit Card**.
4. The system securely verifies candidate credentials. If verified, the official Examination Admit Card overlay is rendered showing candidate details, examination center location, and the complete subject schedule (Datesheet).
5. Click **Print / PDF Download** at the top right of the overlay to print the card. The system is designed to format the print area on a single, clean page.

### 6. Browse Class Syllabus
1. Click **Syllabus** in the Quick Services grid.
2. Filter the available list using the Class dropdown (selecting Class 11 or Class 12) or use the search bar to query by subject/title.
3. Click the **Download PDF Syllabus** button next to the desired subject syllabus to download/view the document.

---

## 🛡️ Step-by-Step Guide for Admin Portal (`http://localhost:5174`)

### 1. Management Overview (Dashboard Tab)
- Shows high-level school analytics (Total Teachers, Active Students, Total Classes, Pending Inquiries).
- Displays active lists of logged activities (Audit Trail).

### 2. Manage Faculty (Teachers Tab)
- **Add Teacher**: Click **Add New Teacher** and input Name, Email, Username, Password, assigned subjects, and qualifications.
- **Update Teacher**: Click the **Edit** icon next to any teacher entry to modify their credentials, assigned classes, or subjects.
- **Remove Teacher**: Click the **Delete** icon.

### 3. Manage Student Registry (Students Tab)
- **Register Student**: Click **Register New Student** and fill out Name, Roll Number, Class, Academic Year, Parent Email, and Date of Birth.
- **Update / Delete**: Click the corresponding inline actions.

### 4. Setup Class Curriculums (Classes Tab)
- Create and assign sections (e.g. Grade `10` Section `A`).
- Specify a list of subjects assigned for that curriculum (e.g. Mathematics, Science, English, etc.) which will dictate the results sheet structure.

### 5. Review & Update Public Bulletins (Notices Desk Tab)
- Click **Write New Notice**.
- Set title, content type (`Notice` or `Announcement`), audience scope (`Public (All)`, `Faculty Only`, or `Students Only`), and enter the text body.
- Click **Publish Bulletin**. The notice will update in real-time on the public landing page.

### 6. Process Incoming Inquiries (Inquiries Tab)
- Contains all contact forms and admission inquiries submitted via the landing page.
- Track incoming messages: click status badges to transition logs through `Pending` -> `Reviewed` -> `Contacted`.
- Unwanted entries can be deleted using the Trash action.

### 7. Manage School Calendar Events (Calendar Tab)
- Create school holidays, board exam schedules, and extracurricular activities.
- Input Title, Event Date, Category (Holiday/Exam/Event), and description.
- Published events will instantly display in the interactive calendar modal on the public landing page.

### 8. Manage Student Admit Cards (Admit Cards Tab)
- **Bulk CSV Upload**: Click the **Upload CSV Admit Cards** button, select the CSV file containing student admit card details, and wait for the row-by-row processor to complete.
- **CSV Headers format**:
  ```csv
  rollNumber,studentName,class,academicYear,dateOfBirth,fatherName,motherName,examCenter,datesheet
  26105342,Aarav Sharma,10-A,2026-2027,2010-04-15,Rajesh Sharma,Meena Sharma,Thakur Biri Singh Inter College Tundla,"English: 2026-03-02 09:00 AM; Mathematics: 2026-03-04 09:00 AM"
  ```
- **Delete**: Click the inline trash button to remove a student's admit card.

### 9. Publish Academic Syllabus (Syllabus Desk Tab)
- **Upload Syllabus PDF**: Click **Upload Syllabus PDF**.
- **Configure**: Enter the Title, select Class (Class 11 or Class 12), Subject, Academic Session, and choose the PDF file from your device.
- **Publish**: Click **Upload Document** to store and publish.
- **Delete**: Click the inline trash button next to the syllabus item to delete the document.

---

## 🍎 Step-by-Step Guide for Teacher Portal (`http://localhost:5175`)

### 1. Assigned Roster (My Classes Tab)
- Displays Assigned Subjects and Experience statistics.
- Lists students currently registered in class groups allocated to the logged educator.

### 2. Record & Publish Marks (Gradebook Tab)
Teachers can enter grade results in two ways:

#### Option A: Manual Entry
1. Select a class (e.g., `10-A`), academic term (e.g., `Half-Yearly` or `Finals`), and academic year.
2. In the table, enter marks obtained in each subject for each student (maximum mark threshold is 100).
3. Click **Publish Grades** to save the record.

#### Option B: Bulk CSV Upload
1. Format a CSV sheet matching your class list. The headers **must** include the students' identifiers, academic metrics, and subject headers.
2. Use the following exact header template:
   ```csv
   rollNumber,studentName,class,academicYear,term,Mathematics,Science,English,Hindi,Social Science
   26105342,Aarav Sharma,10-A,2026-2027,Half-Yearly,85,90,78,92,88
   ```
3. Drag and drop or browse to upload the `.csv` file.
4. The system will display a real-time progress bar processing, validating, and submitting each row's scores.

### 3. Educator Announcements (Notices Desk Tab)
- Teachers can create bulletins that show up on the school dashboard.
- Select from the dropdown to edit or remove prior posts.
