<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(){

        return Socialite::driver('google')->redirect();
    }

    public function callback(){
        $sosialUser = Socialite::driver('google')->user();

        $registeredUser = User::where("google_id", $sosialUser->id)->first();
        if(!$registeredUser){
            $user = User::updateOrCreate([
                'google_id' => $sosialUser->id,
            ], [
                'name' => $sosialUser->name,
                'email' => $sosialUser->email,
                'password' => Hash::make('123'),
                'google_token' => $sosialUser->token,
                'google_refresh_token' => $sosialUser->refreshToken,
            ]);
        
            Auth::login($user);
        
            return redirect('/dashboard');
        }
        Auth::login($registeredUser);
        
        return redirect('/dashboard');
    }
}
