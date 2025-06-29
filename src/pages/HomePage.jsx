import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     

      {/* Hero */}
      <section className="text-center py-20 px-4 bg-blue-50">
        <h2 className="text-4xl font-bold mb-4">Exchange Skills, Expand Horizons</h2>
        <p className="max-w-xl mx-auto text-lg text-gray-600 mb-8">
          Connect with fellow students to teach what you know and learn what you want. The smartest way to grow your skills on campus.
        </p>
        <div className="space-x-4">
          <Link to="/feed" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Explore Skills</Link>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100">Watch Demo</button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">How SkillSwap Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🤝', title: 'Smart Matching', desc: 'Connects students with complementary skills.' },
            { icon: '💬', title: 'Easy Communication', desc: 'Built-in chat to coordinate lessons.' },
            { icon: '⭐', title: 'Verified Reviews', desc: 'Rate your exchange partners.' },
            { icon: '🎯', title: 'Goal Tracking', desc: 'Track your progress with analytics.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-xl shadow">
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="font-semibold text-xl mb-2">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-16 px-8 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-10">Popular Skill Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { category: 'Programming', exchanges: 127, skills: ['React', 'Python', 'JavaScript'] },
            { category: 'Design', exchanges: 89, skills: ['UI/UX', 'Figma', 'Photoshop'] },
            { category: 'Languages', exchanges: 156, skills: ['Spanish', 'French', 'Mandarin'] },
            { category: 'Music', exchanges: 67, skills: ['Guitar', 'Piano', 'Vocals'] },
          ].map(({ category, exchanges, skills }) => (
            <div key={category} className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-semibold text-xl mb-2">{category}</h4>
              <p className="text-sm text-gray-500 mb-2">{exchanges} exchanges</p>
              <p className="text-sm text-gray-600">Popular skills: {skills.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: 'Taught design and learned React. My partner was incredibly patient.', name: 'Hussein osman', skill: 'Learned React' },
            { quote: 'Found the perfect language exchange partner. We practice daily.', name: 'christine Muigai', skill: 'Learned Spanish' },
            { quote: 'Outstanding quality of exchanges. I improved my photography.', name: 'mohammed issa', skill: 'Learned Photography' },
          ].map(({ quote, name, skill }) => (
            <div key={name} className="bg-gray-100 p-6 rounded-xl shadow text-center">
              <p className="italic mb-4">"{quote}"</p>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-gray-600">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-8 text-center bg-blue-50">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Skill Journey?</h3>
        <p className="text-gray-600 mb-6">Join the campus community that's revolutionizing peer-to-peer learning.</p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Start Exchanging</Link>
          <Link to="/how-it-works" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100">Learn More</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-sm py-6 px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-bold mb-2">Platform</h4>
            <p>Browse Skills</p>
            <p>Search</p>
            <p>Profile</p>
            <p>Messages</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <p>Help Center</p>
            <p>Community Guidelines</p>
            <p>Safety</p>
            <p>Contact Us</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Connect</h4>
            <p>Discord Community</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>LinkedIn</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">© 2024 SkillSwap</h4>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
