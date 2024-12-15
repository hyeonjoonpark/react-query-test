import './App.css';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <h1>React Query</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

// App 컴포넌트를 QueryClientProvider로 감싸기
function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
