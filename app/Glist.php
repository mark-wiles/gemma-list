<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Glist extends Model
{
	protected $fillable = ['name', 'description', 'archived', 'user_id'];

	public function user()
	  {
		return $this->belongsTo(User::class);
	  }
	
	public function tasks()
	  {
		return $this->hasMany(Task::class);
		}
		
	public function addTask($task)
		{
		$this->tasks()->create($task);
		}
}