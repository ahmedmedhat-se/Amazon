<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display the authenticated user's cart items
     */
    public function index()
    {
        $cartItems = Auth::user()->carts()->with('product')->get();

        return response()->json([
            'success' => true,
            'data' => $cartItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->product_name,
                        'price' => $item->product->product_price,
                        'image' => $item->product->product_image,
                        'category' => $item->product->product_category
                    ],
                    'quantity' => $item->quantity,
                    'total' => $item->product->product_price * $item->quantity
                ];
            }),
            'grand_total' => $cartItems->sum(function ($item) {
                return $item->product->product_price * $item->quantity;
            })
        ]);
    }

    public function getCartCount($user_id)
    {
        $count = Cart::where('user_id', $user_id)->sum('quantity');
        return response()->json(['count' => $count]);
    }

    /**
     * Add a product to cart
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        $existingCartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingCartItem) {
            $existingCartItem->increment('quantity', $validated['quantity']);
            $cartItem = $existingCartItem;
        } else {
            $cartItem = Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity']
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product added to cart',
            'data' => [
                'id' => $cartItem->id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity
            ]
        ], 201);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        $cart->update(['quantity' => $validated['quantity']]);

        return response()->json([
            'success' => true,
            'message' => 'Cart item updated',
            'data' => [
                'id' => $cart->id,
                'product_id' => $cart->product_id,
                'quantity' => $cart->quantity
            ]
        ]);
    }

    /**
     * Remove item from cart
     */
    public function destroy(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }
}
