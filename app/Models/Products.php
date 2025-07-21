<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;

    protected $fillable = [
        "product_name",
        "product_category",
        "product_desc",
        "product_image",
        "product_price",
        "product_quantity",
        "product_ratings"
    ];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
