export default function TestPage() {
    console.log('✅ TestPage: Rendering');
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-gray-900 dark:text-white mb-4">✅ Test Page Works!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            If you can see this, the routing is working correctly.
          </p>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Current Path: {window.location.pathname}</p>
            <p>Full URL: {window.location.href}</p>
          </div>
        </div>
      </div>
    );
  }
  
