import ExampleCard from '../components/ExampleCard'

export default function Home() {
  return (
    <main>
      <div className="container">
        <h2>Welcome to First Aid App</h2>
        <p>This is your starting point for the First Aid application.</p>

        <h3 style={{marginTop: 20}}>Examples (props + state)</h3>

        <ExampleCard
          title="CPR Basics"
          description="How to perform CPR safely and when to call emergency services."
          initialLikes={2}
        />

        <ExampleCard
          title="Bleeding Control"
          description="Steps to control severe bleeding until help arrives."
          initialLikes={0}
        />
      </div>
    </main>
  )
}