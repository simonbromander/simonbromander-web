export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
  thumbnail?: string;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // In a real application, this would fetch from your CMS
  // For now, we'll use the sample data
  return [
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and how to build your first component.',
      date: '2024-03-04',
      slug: 'getting-started-with-react',
      author: 'Simon Bromander',
      content: `
        <p>React is a powerful library for building user interfaces. It was developed by Facebook and has become one of the most popular front-end frameworks in the world.</p>
        
        <h2>Why React?</h2>
        <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Declarative</li>
          <li>Component-Based</li>
          <li>Learn Once, Write Anywhere</li>
        </ul>
      `
    },
    {
      id: '2',
      title: 'The Power of TypeScript',
      excerpt: 'Discover how TypeScript can improve your development experience.',
      date: '2024-03-03',
      slug: 'power-of-typescript',
      author: 'Simon Bromander',
      content: `
        <p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.</p>
        
        <h2>Benefits of TypeScript</h2>
        <p>TypeScript adds optional static types, classes, and modules to JavaScript, making it easier to write and maintain large applications.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Static Type Checking</li>
          <li>Class-based Object-Oriented Programming</li>
          <li>Enhanced IDE Support</li>
        </ul>
      `
    }
  ];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
} 