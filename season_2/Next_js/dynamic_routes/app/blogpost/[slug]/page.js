'use client'

// throw new Error("Not a valid slug")
export default async function Page({ params }) {
    const { slug } = params;

    const languages = {
        react: "React is a JS library",
        nextjs: "Nextjs is a React framework",
        javascript: "JavaScript is a programming language",
        html: "HTML is a markup language",
        css: "CSS is a style sheet language",
        nodejs: "Nodejs is a runtime environment",
        python: "Python is a programming language",
        java: "Java is a programming language",
        csharp: "C# is a programming language",
        cpp: "C++ is a programming language",
        ruby: "Ruby is a programming language",
        php: "PHP is a programming language",
        swift: "Swift is a programming language",
        kotlin: "Kotlin is a programming language",
        go: "Go is a programming language",
        rust: "Rust is a programming language",
        typescript: "TypeScript is a superset of JavaScript",
        sql: "SQL is a query language",
        bash: "Bash is a shell scripting language",
        powershell: "PowerShell is a task automation framework"
    };

    if (slug in languages) {
        return <div>{languages[slug]}</div>
    }

    return <div>My Post: {slug} not found</div>
}
