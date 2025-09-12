// Initialize CodeMirror editor
const editor = CodeMirror.fromTextArea(document.getElementById('sql-editor'), {
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    indentUnit: 4,
    matchBrackets: true,
    extraKeys: {"Ctrl-Enter": runQuery}
});

// SQL questions database
const questions = [
    {
        id: 1,
        title: "Retrieve All Employees",
        difficulty: "easy",
        description: "Write a SQL query to retrieve all columns from the 'employees' table.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "SELECT * FROM employees;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 2,
        title: "Find Employees in Department",
        difficulty: "easy",
        description: "Write a SQL query to find all employees who work in department with ID 1.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "SELECT * FROM employees WHERE department_id = 1;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 3,
        title: "Calculate Average Salary",
        difficulty: "easy",
        description: "Write a SQL query to calculate the average salary of all employees.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "SELECT AVG(salary) as average_salary FROM employees;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 4,
        title: "Find Highest Paid Employee",
        difficulty: "medium",
        description: "Write a SQL query to find the employee with the highest salary.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "SELECT * FROM employees ORDER BY salary DESC LIMIT 1;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 5,
        title: "Count Employees by Department",
        difficulty: "medium",
        description: "Write a SQL query to count the number of employees in each department.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);`,
        solution: `SELECT d.department_name, COUNT(e.employee_id) as employee_count 
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name;`,
        testData: `INSERT INTO departments VALUES 
(1, 'Engineering'),
(2, 'Marketing');

INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 6,
        title: "Find Employees Hired After Date",
        difficulty: "easy",
        description: "Write a SQL query to find all employees hired after January 1, 2020.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "SELECT * FROM employees WHERE hire_date > '2020-01-01';",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 7,
        title: "Update Employee Salary",
        difficulty: "easy",
        description: "Write a SQL statement to update the salary of employee with ID 1 to 80000.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "UPDATE employees SET salary = 80000 WHERE employee_id = 1;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 8,
        title: "Delete Employee",
        difficulty: "easy",
        description: "Write a SQL statement to delete the employee with ID 3.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: "DELETE FROM employees WHERE employee_id = 3;",
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 9,
        title: "Find Department with Highest Average Salary",
        difficulty: "hard",
        description: "Write a SQL query to find the department with the highest average salary.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);`,
        solution: `SELECT d.department_name, AVG(e.salary) as avg_salary
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY avg_salary DESC
LIMIT 1;`,
        testData: `INSERT INTO departments VALUES 
(1, 'Engineering'),
(2, 'Marketing');

INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    },
    {
        id: 10,
        title: "Find Employees with Salaries Above Average",
        difficulty: "medium",
        description: "Write a SQL query to find all employees with salaries above the company average.",
        schema: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);`,
        solution: `SELECT * FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);`,
        testData: `INSERT INTO employees VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2019-05-22', 82000.00, 2),
(3, 'Robert', 'Johnson', 'robert.j@example.com', '2021-03-10', 68000.00, 1);`
    }
];

// Current selected question
let currentQuestion = null;
let db = null;
let SQL = null;

// Initialize SQL.js
async function initSQL() {
    try {
        // First, try loading from CDNJS
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
        
        // If that fails, try the official SQL.js CDN as fallback
        if (!SQL) {
            SQL = await initSqlJs({
                locateFile: file => `https://sql.js.org/dist/${file}`
            });
        }
        
        db = new SQL.Database();
        console.log("SQL.js initialized successfully");
        
        // Verify database is working
        const testResult = db.exec("SELECT 1+1 as result");
        console.log("Database test query result:", testResult);
    } catch (err) {
        console.error("Error initializing SQL.js:", err);
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Error initializing SQL engine: ${err.message}</p>`;
            
        // Try one more time with a different CDN if first attempt fails
        try {
            SQL = await initSqlJs({
                locateFile: file => `https://unpkg.com/sql.js@1.8.0/dist/${file}`
            });
            db = new SQL.Database();
            console.log("SQL.js initialized successfully on second attempt");
        } catch (err2) {
            console.error("Second initialization attempt failed:", err2);
            document.getElementById('result-output').innerHTML += 
                `<p class="error">Second initialization attempt failed: ${err2.message}</p>`;
        }
    }
}

// Populate question list
function populateQuestionList() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    
    questions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            ${question.title}
            <div class="question-difficulty ${question.difficulty}">
                ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
        `;
        questionItem.addEventListener('click', () => loadQuestion(question.id));
        questionList.appendChild(questionItem);
    });
}

// Load question by ID
function loadQuestion(id) {
    const question = questions.find(q => q.id === id);
    if (!question) return;
    
    currentQuestion = question;
    
    // Update UI
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('question-description').innerHTML = `
        <p>${question.description}</p>
    `;
    document.getElementById('question-schema').innerHTML = `
        <h3>Database Schema:</h3>
        <pre>${question.schema}</pre>
    `;
    
    // Reset editor
    editor.setValue('-- Write your SQL query here\n');
    
    // Highlight selected question
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach(item => item.classList.remove('active'));
    const selectedItem = Array.from(questionItems).find(item => 
        item.textContent.includes(question.title));
    if (selectedItem) selectedItem.classList.add('active');
    
    // Clear previous results
    document.getElementById('result-output').innerHTML = '';
    
    // Initialize database with test data
    if (db) {
        try {
            console.log("Initializing database for question:", question.title);
            
            // Start transaction
            db.run('BEGIN TRANSACTION;');
            
            // Clear existing tables
            const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table'");
            tables.forEach(table => {
                const tableName = table.values[0][0];
                console.log("Dropping table:", tableName);
                db.run(`DROP TABLE IF EXISTS ${tableName};`);
            });
            
            // Create schema
            console.log("Creating schema...");
            db.run(question.schema);
            
            // Insert test data
            console.log("Inserting test data...");
            const statements = question.testData.split(';');
            statements.forEach(stmt => {
                const trimmed = stmt.trim();
                if (trimmed) {
                    db.run(trimmed);
                }
            });
            
            // Commit transaction
            db.run('COMMIT;');
            console.log("Database initialized successfully");
            
            // Verify data was inserted
            try {
                const testQuery = question.schema.includes('employees') ? 
                    "SELECT COUNT(*) as count FROM employees" : 
                    "SELECT name FROM sqlite_master WHERE type='table'";
                const verifyResult = db.exec(testQuery);
                console.log("Verification query result:", verifyResult);
            } catch (verifyErr) {
                console.error("Verification query failed:", verifyErr);
            }
        } catch (err) {
            console.error("Error initializing database:", err);
            document.getElementById('result-output').innerHTML = 
                `<p class="error">Error setting up test database: ${err.message}</p>`;
            db.run('ROLLBACK;');
        }
    } else {
        console.error("Database not initialized");
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Database not ready. Please refresh the page.</p>`;
    }
}

// Run the user's SQL query
function runQuery() {
    if (!currentQuestion) {
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Please select a question first</p>`;
        return;
    }
    
    if (!db) {
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Database not initialized. Please try again.</p>`;
        return;
    }
    
    const sql = editor.getValue();
    if (!sql.trim()) {
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Please write a SQL query first</p>`;
        return;
    }
    
    console.log("Executing query:", sql);
    
    try {
        const result = db.exec(sql);
        console.log("Query result:", result);
        displayResults(result);
        
        // Compare with solution for SELECT queries
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
            compareWithSolution(sql);
        } else {
            // For non-SELECT queries, show success message
            document.getElementById('result-output').innerHTML += 
                `<p class="success">Query executed successfully</p>`;
            
            // For UPDATE/DELETE, show affected rows
            if (sql.trim().toUpperCase().startsWith('UPDATE') || 
                sql.trim().toUpperCase().startsWith('DELETE')) {
                const changes = db.exec("SELECT changes() as affected_rows");
                if (changes.length > 0 && changes[0].values.length > 0) {
                    document.getElementById('result-output').innerHTML += 
                        `<p>Affected rows: ${changes[0].values[0][0]}</p>`;
                }
            }
        }
    } catch (err) {
        console.error("Error executing query:", err);
        document.getElementById('result-output').innerHTML = 
            `<p class="error">SQL Error: ${err.message}</p>`;
    }
}

// Display query results
function displayResults(result) {
    const output = document.getElementById('result-output');
    output.innerHTML = '';
    
    if (result.length === 0) {
        output.innerHTML = '<p class="success">Query executed successfully (no results returned).</p>';
        return;
    }
    
    // Display results in a table
    result.forEach(({columns, values}) => {
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.margin = '10px 0';
        table.style.border = '1px solid #ddd';
        
        // Create header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            th.style.padding = '8px';
            th.style.border = '1px solid #ddd';
            th.style.backgroundColor = '#f2f2f2';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create data rows
        const tbody = document.createElement('tbody');
        values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell !== null ? cell : 'NULL';
                td.style.padding = '8px';
                td.style.border = '1px solid #ddd';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        output.appendChild(table);
    });
}

// Compare user's query with solution
function compareWithSolution(userQuery) {
    if (!currentQuestion || !db) return;
    
    try {
        console.log("Comparing with solution...");
        
        // Execute user's query
        const userResult = db.exec(userQuery);
        
        // Execute solution query
        const solutionResult = db.exec(currentQuestion.solution);
        
        // Simple comparison - just check if the results match
        const userResultStr = JSON.stringify(userResult);
        const solutionResultStr = JSON.stringify(solutionResult);
        
        const output = document.getElementById('result-output');
        if (userResultStr === solutionResultStr) {
            const successMsg = document.createElement('p');
            successMsg.className = 'success';
            successMsg.textContent = '✅ Correct answer! Your query produced the expected results.';
            output.prepend(successMsg);
        } else {
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error';
            errorMsg.textContent = '❌ Your query results do not match the expected solution.';
            output.prepend(errorMsg);
            
            // Show expected results
            const expectedHeader = document.createElement('h3');
            expectedHeader.textContent = 'Expected Results:';
            output.appendChild(expectedHeader);
            
            displayResults(solutionResult);
        }
    } catch (err) {
        console.error("Error comparing with solution:", err);
        document.getElementById('result-output').innerHTML += 
            `<p class="error">Error comparing with solution: ${err.message}</p>`;
    }
}

// Show solution
function showSolution() {
    if (!currentQuestion) return;
    
    editor.setValue(currentQuestion.solution);
    document.getElementById('result-output').innerHTML = 
        '<p>Solution loaded. Click "Run Query" to see the results.</p>';
}

// Reset editor
function resetEditor() {
    editor.setValue('-- Write your SQL query here\n');
    document.getElementById('result-output').innerHTML = '';
}

// Initialize the application
async function initialize() {
    // Show loading message
    document.getElementById('result-output').innerHTML = '<p>Initializing SQL engine...</p>';
    
    await initSQL();
    populateQuestionList();
    
    // Set up event listeners
    document.getElementById('run-button').addEventListener('click', runQuery);
    document.getElementById('reset-button').addEventListener('click', resetEditor);
    document.getElementById('show-solution').addEventListener('click', showSolution);
    
    // Load first question by default
    if (questions.length > 0) {
        loadQuestion(questions[0].id);
    }
    
    // Check if everything initialized properly
    if (!db) {
        document.getElementById('result-output').innerHTML = 
            `<p class="error">Failed to initialize SQL engine. Please check:<br>
            1. Your internet connection<br>
            2. Browser console for errors<br>
            3. Try refreshing the page</p>`;
    }
}

// Start the app when the page loads
window.addEventListener('DOMContentLoaded', initialize);