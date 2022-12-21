<?php

namespace App\Helpers\Queries;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class QueryHelper
{
    private Model $model;
    private Request $request;

    function __construct(Model $model, Request $request)
    {
        $this->model = $model;
        $this->request = $request;
    }

    public function query()
    {
        return $this->model
            ->when($this->request->query('search'), function ($query) {
                $query->where('name', 'like', "%" . $this->request->query('search') . "%");
            })
            ->when($this->request->has(['column', 'sort']), function ($query) {
                $query->where($this->request->query('column'), $this->request->query('sort'));
            })
            ->newQuery();
    }

    public function paginate(int $limit = 10)
    {
        $_limit = $this->request->has('limit') ? $this->request->query('limit') : $limit;
        return $this->query()->paginate($_limit);
    }
}