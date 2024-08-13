<?php

namespace App\Http\Controllers;

use App\Models\Estate;
use App\Models\Jenistanah;
use App\Models\MutuTransport;
use App\Models\Regional;
use App\Models\Wilayah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Dashboardcontroller extends Controller
{
    //
    public function index()
    {

        $data = Regional::all();

        return Inertia::render('Dashboard', [
            'data' => $data
        ]);
    }

    public function getData(Request $request)
    {
        $id = $request->input('id');
        $reg = $id['code'];

        // Fetch Wilayah records with related estates
        $wil = Wilayah::where('regional', $reg)->with('Estate')->get();

        $nama_estate = []; // Array to hold the 'est' values

        // Iterate over each Wilayah record
        foreach ($wil as $wilayah) {
            // Iterate over the related estates of the current Wilayah
            foreach ($wilayah->Estate as $estate) {
                // Collect the 'est' value from each Estate
                $nama_estate[] = $estate->est;
            }
        }



        // Fetch data from Jenistanah (this part is independent of the above code)
        $data = MutuTransport::wherein('estate', $nama_estate)->where('datetime', 'like', '%2024-06%')->get();


        return response()->json(['data' => $data]);
    }

    public function detailData(Request $request)
    {
        $id = $request->input('id');
        // dd($id);

        $data = MutuTransport::where('id', $id)->first();

        // dd($data);

        return response()->json(['data' => $data]);
    }
}
