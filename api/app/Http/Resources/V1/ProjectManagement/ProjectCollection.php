<?php

namespace App\Http\Resources\V1\ProjectManagement;

use App\Constants\ProjectTransactionConstant;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProjectCollection extends ResourceCollection
{

    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($result) {
                return array_merge($result->toArray(), [
                    'active_project_transaction' => collect($result->project_transactions)->whereIn('status', ProjectTransactionConstant::PROJECT_TRANSACTION_STATUS_ON_GOING())->first()
                ]);
            }),
            'pagination' => [
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage()
            ],
        ];
    }
}