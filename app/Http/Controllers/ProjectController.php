<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Project;

class ProjectController extends Controller
{
    public function getProjectList(Request $request)
    {
        $page = $request->input('page');
        $itemsPerPage = $request->input('per_page');
        $offset = ($page - 1) * $itemsPerPage;

        $columns = ['id', 'project_name', 'slug', 'project_description', 'start_date', 'project_images'];
        $projects = Project::where('active', 1)->offset($offset)->limit($itemsPerPage)->get($columns)->toArray();
        $data = $p = [];
        $maxLength = 360;
        foreach ($projects as $project) {
            foreach ($columns as $column) {
                if ($column == 'project_description') {
                    if (strlen($project[$column]) > $maxLength) {
                        $description = $project[$column];
                        $i = $maxLength - 1;
                        while ($description[$i] != ' ') $i--;
                        $p[$column] = substr($description, 0, $i + 1) . '...';
                    } else {
                        $p[$column] = $project[$column];
                    }
                } elseif ($column == 'project_images') {
                    $projectImages = json_decode($project[$column], true);
                    foreach ($projectImages as $projectImage) {
                        if ($projectImage['main'] == 1) {
                            $p['project_image'] = $projectImage['image'];
                            break;
                        }
                    }
                } else {
                    $p[$column] = $project[$column];
                }
            }
            array_push($data, $p);
        }

        $paginationResult = [
            "total" => Project::where('active', 1)->count(),
            "data" => $data
        ];

        // return json result
        if ($request->input('callback')) {
            return response()->json($paginationResult)->withCallback($request->input('callback'));
        } else {
            return response()->json($paginationResult);
        }
    }

    public function getProjectBySlug(Request $request, $slug = null)
    {
        $data = Project::where('slug', $slug)->first()->toArray();
        $data['project_images'] = json_decode($data['project_images'], true);

        // return json result
        if ($request->input('callback')) {
            return response()->json($data)->withCallback($request->input('callback'));
        } else {
            return response()->json($data);
        }
    }

}
