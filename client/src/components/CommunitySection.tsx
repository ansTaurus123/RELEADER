import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CommunitySection() {
  const communities = [
    {
      id: "anxiety",
      name: "Anxiety Support Circle",
      moderator: "Dr. Sarah Johnson",
      status: "Active Now",
      statusType: "active",
      description: "A safe space to discuss anxiety management techniques, share experiences, and support one another through challenging times.",
      members: 2189
    },
    {
      id: "mindfulness",
      name: "Mindfulness Meditation",
      moderator: "Dr. Michael Chen",
      status: "Session at 8 PM",
      statusType: "scheduled",
      description: "Learn and practice various mindfulness techniques to reduce stress, improve focus, and enhance overall mental well-being.",
      members: 1852
    },
    {
      id: "career",
      name: "Career Transition Support",
      moderator: "Dr. Lisa Martinez",
      status: "Weekly Meetings",
      statusType: "recurring",
      description: "Navigate career changes and professional development challenges with support from peers and expert guidance.",
      members: 1246
    }
  ];

  return (
    <section id="communities" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Join Supportive Communities</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Connect with others facing similar challenges in our moderated group environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Featured Community */}
          <motion.div 
            className="md:col-span-3 bg-primary-50 rounded-2xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="outline" className="bg-primary-100 text-primary-700 border-none px-4 py-1 text-sm font-medium mb-4 w-fit">
                  Featured Community
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">Student Success Network</h3>
                <p className="text-neutral-600 mb-6">
                  A supportive community of students and young professionals sharing strategies for academic success, stress management, and career development.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex -space-x-2">
                    <img 
                      className="h-8 w-8 rounded-full ring-2 ring-white" 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Community member" 
                    />
                    <img 
                      className="h-8 w-8 rounded-full ring-2 ring-white" 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Community member" 
                    />
                    <img 
                      className="h-8 w-8 rounded-full ring-2 ring-white" 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Community member" 
                    />
                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-700">+245</div>
                  </div>
                  <span className="text-sm text-neutral-600">4,298 members</span>
                </div>
                <Button>
                  Join Community
                </Button>
              </div>
              <div className="bg-neutral-100 p-8 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Student community collaboration" 
                  className="rounded-xl shadow-md max-w-full h-auto" 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Regular Communities */}
          {communities.map((community, i) => (
            <motion.div 
              key={community.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:scale-[1.03] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="p-6 border-b border-neutral-100">
                <h3 className="text-xl font-semibold text-neutral-800 mb-1">{community.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-neutral-600 text-sm">Moderated by {community.moderator}</p>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${community.statusType === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                      ${community.statusType === 'scheduled' ? 'bg-neutral-100 text-neutral-800 border-neutral-200' : ''}
                      ${community.statusType === 'recurring' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                    `}
                  >
                    {community.status}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-700 text-sm mb-4">
                  {community.description}
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex -space-x-2">
                    <img className="h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" alt="Community member" />
                    <img className="h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" alt="Community member" />
                    <img className="h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" alt="Community member" />
                    <div className="h-6 w-6 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-700">+{community.members > 99 ? community.members.toString().substring(0, 2) : community.members}</div>
                  </div>
                  <span className="text-xs text-neutral-600">{community.members.toLocaleString()} members</span>
                </div>
                <Button variant="outline" className="w-full border-primary-500 text-primary-500 hover:bg-primary-50">
                  Join Community
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50"
          >
            Explore All Communities
          </Button>
        </div>
      </div>
    </section>
  );
}
