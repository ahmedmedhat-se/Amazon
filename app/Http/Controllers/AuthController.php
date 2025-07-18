<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registered successfully!',
            'token' => $token,
            'user' => $user
        ]);
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->getAuthPassword())) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect credentials.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'User retrieved successfully.',
            'user' => $user
        ]);
    }
}