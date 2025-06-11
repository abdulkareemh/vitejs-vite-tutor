<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Transform Your Learning Journey with
              <span class="gradient-text">AI-Powered Education</span>
            </h1>
            <p class="hero-subtitle">
              Create personalized learning paths, track your progress, and achieve your educational goals 
              with our intelligent curriculum generator powered by cutting-edge AI technology.
            </p>
            <div class="hero-actions">
              <router-link v-if="!authStore.user" to="/signup" class="btn btn-primary btn-large">
                Start Learning Free
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <LearningGoals v-else />
              <button class="btn btn-secondary btn-large" @click="scrollToFeatures">
                Learn More
              </button>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Active Learners</span>
              </div>
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">Courses Created</span>
              </div>
              <div class="stat">
                <span class="stat-number">95%</span>
                <span class="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="floating-cards">
              <div class="card card-1">
                <div class="card-icon">📚</div>
                <h4>Personalized Learning</h4>
                <p>AI adapts to your pace</p>
              </div>
              <div class="card card-2">
                <div class="card-icon">🎯</div>
                <h4>Goal Tracking</h4>
                <p>Monitor your progress</p>
              </div>
              <div class="card card-3">
                <div class="card-icon">🚀</div>
                <h4>Fast Results</h4>
                <p>Learn efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section features">
      <div class="container">
        <h2 class="section-title">Why Choose EduLearn?</h2>
        <p class="section-subtitle">
          Our platform combines the latest in AI technology with proven educational methodologies 
          to deliver a learning experience that's both effective and engaging.
        </p>
        
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">
          Get started with your personalized learning journey in just three simple steps.
        </p>
        
        <div class="steps">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section testimonials">
      <div class="container">
        <h2 class="section-title">What Our Learners Say</h2>
        <p class="section-subtitle">
          Join thousands of successful learners who have transformed their skills with EduLearn.
        </p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="testimonial-content">
              <div class="stars">
                <span v-for="n in 5" :key="n">⭐</span>
              </div>
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
            </div>
            <div class="testimonial-author">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">{{ testimonial.name }}</h4>
                <p class="author-role">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Start Your Learning Journey?</h2>
          <p class="cta-subtitle">
            Join thousands of learners who are already transforming their skills with AI-powered education.
          </p>
          <div class="cta-actions">
            <router-link v-if="!authStore.user" to="/signup" class="btn btn-primary btn-large">
              Get Started Free
            </router-link>
            <router-link v-else to="/profile" class="btn btn-primary btn-large">
              Continue Learning
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import LearningGoals from '../components/LearningGoals.vue'

const authStore = useAuthStore()

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const features = [
  {
    id: 1,
    title: 'AI-Powered Curriculum',
    description: 'Our advanced AI analyzes your goals and creates a personalized learning path tailored to your needs and learning style.',
    icon: 'BrainIcon'
  },
  {
    id: 2,
    title: 'Interactive Learning',
    description: 'Engage with interactive content, quizzes, and hands-on projects that make learning both fun and effective.',
    icon: 'InteractiveIcon'
  },
  {
    id: 3,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and insights to stay motivated and on track.',
    icon: 'ChartIcon'
  },
  {
    id: 4,
    title: 'Expert Resources',
    description: 'Access curated resources from industry experts and top educational institutions worldwide.',
    icon: 'BookIcon'
  },
  {
    id: 5,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with flexible scheduling that adapts to your busy lifestyle.',
    icon: 'ClockIcon'
  },
  {
    id: 6,
    title: 'Community Support',
    description: 'Connect with fellow learners and mentors in our supportive learning community.',
    icon: 'CommunityIcon'
  }
]

const steps = [
  {
    title: 'Set Your Goals',
    description: 'Tell us what you want to learn and your current skill level. Our AI will understand your objectives.'
  },
  {
    title: 'Get Your Plan',
    description: 'Receive a personalized 4-week learning curriculum with tasks, resources, and milestones.'
  },
  {
    title: 'Start Learning',
    description: 'Follow your custom plan, track progress, and achieve your learning goals efficiently.'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    text: 'EduLearn helped me transition from marketing to tech in just 3 months. The AI-generated curriculum was spot-on!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Scientist',
    text: 'The personalized learning path made complex topics digestible. I landed my dream job thanks to EduLearn!',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    text: 'Amazing platform! The AI understood exactly what I needed to learn and created the perfect study plan.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
]
</script>

<style scoped>
.home {
  padding-top: 80px;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-stats {
  display: flex;
  gap: 40px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-visual {
  position: relative;
  height: 500px;
}

.floating-cards {
  position: relative;
  height: 100%;
}

.card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.card h4 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.card p {
  font-size: 0.9rem;
  opacity: 0.8;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Features Section */
.features {
  background: #f8fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1a202c;
}

.feature-description {
  color: #718096;
  line-height: 1.6;
}

/* How It Works Section */
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a202c;
}

.step-description {
  color: #718096;
  line-height: 1.6;
}

/* Testimonials Section */
.testimonials {
  background: #f8fafc;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.testimonial-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stars {
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 24px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 4px;
}

.author-role {
  color: #718096;
  font-size: 0.9rem;
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-visual {
    height: 300px;
  }

  .features-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    text-align: center;
  }
}
</style>