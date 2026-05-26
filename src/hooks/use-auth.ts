import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { getSessionFn, signInFn, signUpFn, signOutFn } from "@/services/auth"

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: () => getSessionFn(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const signIn = useMutation({
    mutationFn: signInFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
      router.navigate({ to: "/dashboard" })
    },
  })

  const signUp = useMutation({
    mutationFn: signUpFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
      router.navigate({ to: "/dashboard" })
    },
  })

  const signOut = useMutation({
    mutationFn: signOutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
      router.navigate({ to: "/" })
    },
  })

  return {
    user: sessionQuery.data?.user ?? null,
    session: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    signIn,
    signUp,
    signOut,
  }
}
