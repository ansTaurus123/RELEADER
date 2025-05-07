import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { matchTherapists } from "@/lib/qdrant";
import { TherapistMatchingForm, Therapist } from "@/types";

export function useTherapistMatching() {
  const [matches, setMatches] = useState<Therapist[]>([]);
  
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: TherapistMatchingForm) => matchTherapists(formData),
    onSuccess: (data) => {
      setMatches(data);
    },
  });
  
  const findMatches = (formData: TherapistMatchingForm) => {
    mutate(formData);
  };
  
  return {
    findMatches,
    matchesLoading: isPending,
    matches
  };
}
