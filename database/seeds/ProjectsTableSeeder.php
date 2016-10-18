<?php

use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = storage_path() . "/json/projects.json";
        $records = json_decode(file_get_contents($path), true);
        $columns = array_keys($records[0]);
        $projects = $project = [];
        foreach ($records as $record) {
            foreach ($columns as $column) {
                if ($column == 'project_images') {
                    $project[$column] = json_encode($record[$column]);
                } elseif ($column == 'start_date' || $column == 'end_date'){
                    $project[$column] = DateTime::createFromFormat('d/m/Y', $record[$column]);
                } else {
                    $project[$column] = $record[$column];
                }
            }
            array_push($projects, $project);
            unset($project);
            $project = [];
        }
        DB::table('projects')->insert($projects);
    }
}
