// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Modern Animated Login</title>
//     <!-- Tailwind CSS CDN -->
//     <script src="https://cdn.tailwindcss.com"></script>
//     <!-- Google Fonts: Inter -->
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//     <style>
//         body {
//             font-family: 'Inter', sans-serif;
//             overflow: hidden; /* Prevent scrollbar from wave animation */
//         }
//         /* Custom Keyframe for Fade-in animation */
//         @keyframes fadeIn {
//             from {
//                 opacity: 0;
//                 transform: translateY(20px);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateY(0);
//             }
//         }
//         .animate-fadeIn {
//             animation: fadeIn 0.8s ease-out forwards;
//         }

//         /* Custom Keyframe for subtle wave background */
//         @keyframes wave {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//         }

//         .bg-gradient-wave {
//             background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
//             background-size: 400% 400%;
//             animation: wave 15s ease infinite;
//         }

//         /* Custom shadow for hover effect, extending Tailwind's default */
//         .shadow-3xl {
//             box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
//         }
//     </style>
// </head>
// <body class="min-h-screen bg-gradient-wave flex items-center justify-center p-4 sm:p-6">

//     <div class="animate-fadeIn bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">

//         <div class="text-center mb-8">
//             <svg class="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
//             </svg>
//             <h2 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
//                 Welcome Back!
//             </h2>
//             <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                 Sign in to continue to your account.
//             </p>
//         </div>

//         <form class="space-y-6">
//             <div>
//                 <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
//                 <div class="relative">
//                     <input type="email" id="email" name="email" autocomplete="email" required
//                            class="peer block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
//                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
//                                   transition duration-200 ease-in-out transform
//                                   focus:scale-[1.01] hover:border-indigo-400 focus:bg-white dark:focus:bg-gray-800">
//                     <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg class="h-5 w-5 text-gray-400 dark:text-gray-500 peer-focus:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
//                 <div class="relative">
//                     <input type="password" id="password" name="password" autocomplete="current-password" required
//                            class="peer block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
//                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
//                                   transition duration-200 ease-in-out transform
//                                   focus:scale-[1.01] hover:border-indigo-400 focus:bg-white dark:focus:bg-gray-800">
//                     <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg class="h-5 w-5 text-gray-400 dark:text-gray-500 peer-focus:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             <div class="flex items-center justify-between">
//                 <div class="flex items-center">
//                     <input id="remember-me" name="remember-me" type="checkbox"
//                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 transition-colors duration-200 ease-in-out">
//                     <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
//                         Remember me
//                     </label>
//                 </div>

//                 <div class="text-sm">
//                     <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 ease-in-out">
//                         Forgot your password?
//                     </a>
//                 </div>
//             </div>

//             <div>
//                 <button type="submit"
//                         class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
//                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
//                                transform transition-all duration-200 ease-in-out
//                                active:scale-95 hover:scale-[1.01] shadow-lg hover:shadow-xl
//                                dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600">
//                     <span class="absolute left-0 inset-y-0 flex items-center pl-3">
//                         <svg class="h-5 w-5 text-indigo-300 group-hover:text-white dark:text-indigo-200 dark:group-hover:text-white transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                             <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
//                         </svg>
//                     </span>
//                     Sign In
//                 </button>
//             </div>
//         </form>

//         <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
//             Don't have an account?
//             <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 ease-in-out">
//                 Sign Up
//             </a>
//         </div>
//     </div>

// </body>
// </html>