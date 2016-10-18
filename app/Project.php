<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_name',
        'project_description',
        'project_content',
        'project_duration',
        'project_duration',
        'start_date',
        'end_date',
        'project_status',
        'project_owner',
        'project_role',
        'project_evaluation',
        'project_images',
        'project_note',
        'active',
        'created_at',
        'updated_at'
    ];
}
