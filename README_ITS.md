

## ✨ Key Features

✅ **Adaptive Learning Paths** - Content unlocks based on pretest performance  
✅ **Progress Tracking** - Visual progress bars for sections and modules  
✅ **Diagnostic Pretest** - 5-question assessment to gauge starting knowledge  
✅ **Locked/Unlocked Sections** - Clear visual indicators and access control  
✅ **Local Storage** - Automatic progress saving across sessions  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  
✅ **Multiple Modules** - 3 sample modules with 6-7 sections each  

## 🚀 Quick Start

```bash
npm install
npm start
```


## 📚 How It Works

1. **Dashboard** - View all available modules
2. **Module Overview** - See all sections for a module
3. **Take Pretest** - Answer diagnostic questions (5 questions)
4. **Sections Unlock** - Based on pretest score:
   - ✓ 40%+ → All sections unlocked
   - ✓ 20-39% → First 2 sections unlocked
   - ✓ <20% → First section only
5. **Learn** - Access unlocked content sections
6. **Mark Complete** - Track your progress
7. **Posttest** - Available after completing content

## 🎯 Adaptive Unlocking

The system uses an adaptive algorithm to customize learning:

```
Pretest Score Range    → Unlocked Sections
- 40% or higher        → All learning sections + posttest
- 20% to 39%          → First 2 learning sections
- Below 20%           → First learning section only
```

## 📊 Progress Bars

- **Section Progress**: Individual completion status (0-100%)
- **Module Progress**: Combined progress across all sections
- **Color Coding**: 
  - Blue: In Progress
  - Green: Complete
  - Red/Warning: Locked sections

## 💾 Data Management

- Progress is saved in browser **localStorage**
- All module data, pretest scores, and section completion are persisted
- Clear persistent state across browser sessions

## 📁 Project Structure

```
src/
├── App.tsx                          # App wrapper with routing
├── Dashboard.tsx                    # Main dashboard
├── types.ts                         # TypeScript interfaces
├── data.ts                          # Sample data & questions
├── components/
│   ├── ModuleOverview.tsx          # Module page
│   ├── Pretest.tsx                 # Quiz component
│   ├── Section.tsx                 # Content page
│   └── ProgressBarComponent.tsx     # Progress UI
└── styles/
    ├── ModuleOverview.css
    ├── Pretest.css
    └── Section.css
```

## 🎓 Sample Modules

### Module 1: Fundamentals of Web Development
- Pretest, HTML Basics, CSS Styling, JavaScript Fundamentals, Project, Posttest

### Module 2: React and Modern JavaScript
- Pretest, ES6+ Features, React Components, State & Props, Hooks, Project, Posttest

### Module 3: Backend Development
- Pretest, Node.js Basics, Express.js, Database Design, REST APIs, Project, Posttest

## 🔧 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **React Bootstrap** - UI components
- **CSS3** - Styling with gradients and animations

## 🌟 Features to Explore

1. Click through all 3 modules
2. Take pretests with different scores to see adaptive unlocking
3. Access various sections and mark them complete
4. Watch progress bars update in real-time
5. Return to dashboard to see module statistics

## 📝 Customization

### Add More Modules
Edit `src/data.ts` to add new modules:
```typescript
{
  id: 4,
  title: "Your Module Title",
  description: "Module description",
  icon: "🎯",
  sections: [/* section array */],
  // ...
}
```

### Customize Pretest
Modify questions in `src/data.ts` in the `samplePretestQuestions` array

### Adjust Unlock Thresholds
Edit unlock logic in `src/components/Pretest.tsx` in the `handleNext()` function

## 🎨 Styling

- **Gradient Background**: Purple-blue gradient on dashboard
- **Card-based Layout**: Clean card design for modules and sections
- **Color Indicators**: 
  - 🔓 Green unlock icons for unlocked sections
  - 🔒 Red lock icons for locked sections
  - Progress bars with color variants

## 🚀 Next Steps

1. **Backend Integration** - Connect to API for persistent data
2. **User Authentication** - Add login/user accounts
3. **Real Content** - Replace placeholder content with actual lessons
4. **Analytics** - Track detailed learning patterns
5. **Reporting** - Generate progress reports for instructors

---

Built with React | TypeScript | Bootstrap

For detailed implementation information, see `ITS_IMPLEMENTATION_GUIDE.md`
