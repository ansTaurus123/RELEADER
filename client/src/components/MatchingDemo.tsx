import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { 
  Textarea 
} from "@/components/ui/textarea";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Progress 
} from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Info, Star, StarHalf } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTherapistMatching } from "@/hooks/useTherapistMatching";

interface MatchingDemoProps {
  showMatchingScreen: boolean;
  matchingProgress: number;
  setMatchingProgress: (progress: number) => void;
  onStartChat: () => void;
}

const formSchema = z.object({
  feeling: z.string(),
  prevTherapy: z.string(),
  goals: z.array(z.string()).min(1, { message: "Select at least one goal" }),
  preferences: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function MatchingDemo({ 
  showMatchingScreen, 
  matchingProgress, 
  setMatchingProgress,
  onStartChat
}: MatchingDemoProps) {
  const [step, setStep] = useState("questions"); // questions, matching, results
  const { findMatches, matchesLoading, matches } = useTherapistMatching();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feeling: "anxiety",
      prevTherapy: "no",
      goals: ["anxiety", "productivity"],
      preferences: "I'd prefer someone who specializes in anxiety and has experience with academic stress."
    },
  });

  // Simulate progress when in matching step
  useEffect(() => {
    if (step === "matching") {
      const steps = [
        { id: "step1", target: 100, delay: 0 },
        { id: "step2", target: 100, delay: 1000 },
        { id: "step3", target: 100, delay: 2500 },
        { id: "step4", target: 100, delay: 4000 }
      ];
      
      steps.forEach(({ id, target, delay }) => {
        setTimeout(() => {
          const el = document.getElementById(`${id}-progress`);
          const percentEl = document.getElementById(`${id}-percent`);
          if (el) el.style.width = `${target}%`;
          if (percentEl) percentEl.innerText = `${target}%`;
        }, delay);
      });
      
      // Show results after matching completes
      setTimeout(() => {
        setStep("results");
      }, 6000);
    }
  }, [step]);
  
  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    setStep("matching");
    findMatches(values);
  };

  const renderQuestionsStep = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-neutral-800">Tell us about yourself</h3>
            <span className="text-sm font-medium text-neutral-500">Step 1 of 3</span>
          </div>
          
          <div className="space-y-6 mb-8">
            <FormField
              control={form.control}
              name="feeling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">How are you feeling today?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-lg">
                        <SelectValue placeholder="Select how you're feeling" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="anxiety">I've been feeling anxious lately</SelectItem>
                        <SelectItem value="depression">I'm experiencing depression symptoms</SelectItem>
                        <SelectItem value="work-stress">I'm dealing with work-related stress</SelectItem>
                        <SelectItem value="relationship">I need help with relationship issues</SelectItem>
                        <SelectItem value="academic">I'm struggling with academic pressure</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="prevTherapy"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-neutral-700">Have you tried therapy before?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="therapy-yes" />
                        <label htmlFor="therapy-yes" className="text-neutral-700">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="therapy-no" />
                        <label htmlFor="therapy-no" className="text-neutral-700">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="goals"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-sm font-medium text-neutral-700">What are your therapy goals? (Select all that apply)</FormLabel>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "anxiety", label: "Manage anxiety & stress" },
                      { id: "relationships", label: "Improve relationships" },
                      { id: "productivity", label: "Boost productivity" },
                      { id: "trauma", label: "Process trauma" }
                    ].map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="goals"
                        render={({ field }) => {
                          return (
                            <div className="flex items-center p-3 border border-neutral-200 rounded-lg hover:border-primary-300 cursor-pointer transition-all">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <label
                                htmlFor={item.id}
                                className="ml-2 text-neutral-700 cursor-pointer"
                              >
                                {item.label}
                              </label>
                            </div>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Do you have any therapist preferences?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., gender, specialization, approach..."
                      className="resize-none"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              Continue
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );

  const renderMatchingStep = () => (
    <CardContent className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-3xl text-primary-500"
          >
            <path d="M10 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5" />
            <path d="M9 6v-1a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1" />
            <path d="M10 16.5l-2.939 -2.939a2.121 2.121 0 0 1 3 -3l2.939 2.939" />
            <path d="M13.5 13l6.5 6.5" />
            <path d="M13.5 19.5l6.5 -6.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">AI-Powered Matching in Progress</h3>
        <p className="text-neutral-600">Our AI is analyzing your responses to find your ideal therapist match</p>
      </div>
      
      <div className="mb-8 space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Analyzing your needs</span>
            <span className="text-sm font-medium text-neutral-500" id="step1-percent">0%</span>
          </div>
          <Progress value={0} className="h-2" id="step1-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Searching therapist database</span>
            <span className="text-sm font-medium text-neutral-500" id="step2-percent">0%</span>
          </div>
          <Progress value={0} className="h-2" id="step2-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Calculating compatibility scores</span>
            <span className="text-sm font-medium text-neutral-500" id="step3-percent">0%</span>
          </div>
          <Progress value={0} className="h-2" id="step3-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Finalizing recommendations</span>
            <span className="text-sm font-medium text-neutral-500" id="step4-percent">0%</span>
          </div>
          <Progress value={0} className="h-2" id="step4-progress" />
        </div>
      </div>
      
      <div className="bg-primary-50 p-4 rounded-lg">
        <div className="flex">
          <Info className="text-primary-500 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-neutral-700">
              <span className="font-medium">How our matching works:</span> Our AI uses Qdrant vector search technology to calculate similarity between your needs and therapist profiles, creating a multidimensional understanding of the perfect match.
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  );

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      title: "Clinical Psychologist • Anxiety Specialist",
      experience: "12 years experience",
      rating: 4.8,
      reviews: 387,
      match: 98,
      bio: "I specialize in helping young professionals and students manage anxiety and academic stress through evidence-based cognitive behavioral techniques.",
      tags: ["CBT", "Mindfulness"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      title: "Licensed Therapist • Performance Coach",
      rating: 4.1,
      reviews: 219,
      match: 85
    },
    {
      id: 3,
      name: "Dr. Lisa Martinez",
      photo: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      title: "Clinical Psychologist • Trauma Specialist",
      rating: 4.6,
      reviews: 305,
      match: 82
    }
  ];

  const renderResultsStep = () => (
    <>
      <CardHeader className="p-8 border-b border-neutral-200">
        <CardTitle className="text-xl font-semibold text-neutral-800 mb-2">We found your ideal matches!</CardTitle>
        <CardDescription className="text-neutral-600">
          Based on your profile, our AI has identified these therapists as excellent matches for your needs.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Top Match */}
        <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <img 
                src={therapists[0].photo}
                alt={therapists[0].name} 
                className="h-24 w-24 object-cover rounded-lg" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h4 className="text-lg font-semibold text-neutral-800 mr-2">{therapists[0].name}</h4>
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">{therapists[0].match}% Match</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">{therapists[0].title} • {therapists[0].experience}</p>
              <div className="flex items-center mb-3">
                <div className="flex text-amber-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <StarHalf className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm text-neutral-500 ml-1">{therapists[0].rating} ({therapists[0].reviews} reviews)</span>
              </div>
              <p className="text-sm text-neutral-700 mb-4">
                {therapists[0].bio}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  {therapists[0].tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  onClick={onStartChat}
                >
                  Start Session
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other Matches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapists.slice(1).map((therapist, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-neutral-200 hover:scale-[1.03] transition-transform duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={therapist.photo}
                    alt={therapist.name} 
                    className="h-16 w-16 object-cover rounded-lg" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="text-base font-semibold text-neutral-800 mr-2">{therapist.name}</h4>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">{therapist.match}% Match</span>
                  </div>
                  <p className="text-xs text-neutral-600 mb-1">{therapist.title}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      {therapist.rating >= 4.5 ? (
                        <StarHalf className="h-3 w-3 fill-current" />
                      ) : (
                        <Star className="h-3 w-3 stroke-current fill-none" />
                      )}
                    </div>
                    <span className="text-xs text-neutral-500 ml-1">{therapist.rating} ({therapist.reviews} reviews)</span>
                  </div>
                  <Button variant="link" size="sm" className="text-xs px-0 h-auto">View Profile</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline">
            View All Matches
          </Button>
        </div>
      </CardContent>
    </>
  );

  return (
    <section id="matching-demo" className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Experience AI-Powered Therapist Matching</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our advanced AI uses Qdrant vector search to analyze your responses and connect you with the perfect therapist based on your unique needs.
          </p>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === "questions" && renderQuestionsStep()}
          {step === "matching" && renderMatchingStep()}
          {step === "results" && renderResultsStep()}
        </motion.div>
      </div>
    </section>
  );
}
