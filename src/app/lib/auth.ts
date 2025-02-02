import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function getUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null
  
  return prisma.user.findUnique({
    where: { email: session.user.email }
  })
}

export async function checkUserRole(userId: string, allowedRoles: string[]) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  })
  
  return user && allowedRoles.includes(user.role)
}

// HOC for client-side role protection
export function withRoleProtection(WrappedComponent: React.ComponentType, allowedRoles: string[]) {
  return function ProtectedComponent(props: any) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return
      
      if (!session) {
        router.push('/login')
        return
      }

      if (!allowedRoles.includes(session.user.role)) {
        router.push('/unauthorized')
      }
    }, [session, status, router])

    if (status === 'loading') {
      return <div>Loading...</div>
    }

    if (!session || !allowedRoles.includes(session.user.role)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}