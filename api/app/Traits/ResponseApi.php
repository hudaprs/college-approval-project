<?php

namespace App\Traits;

trait ResponseApi
{
    protected function renderMessage($response)
    {
        // Check if is came from SQL Exception
        if ($response instanceof \Illuminate\Database\QueryException) {
            // Check if error contain Cannot delete or update a parent row: a foreign key constraint.
            if ($response->errorInfo[1] === 1451) {
                return "This data still being used in another table!";
            }

            return $response->errorInfo;
        }

        // Check if it is came from exception
        if ($response instanceof \Exception) {
            return $response->getMessage();
        }

        return $response;
    }

    /**
     * Core of response
     *
     * @param mixed $message
     * @param mixed $data
     * @param int $statusCode
     * @param bool $isSuccess
     */
    protected function coreResponse($response, $data = null, $statusCode = 200, bool $isSuccess)
    {
        // Send the response
        if ($isSuccess) {
            return response()->json([
                'message' => $response,
                'results' => $data
            ], $statusCode);
        } else {
            return response()->json([
                'message' => $this->renderMessage($response),
                'stack' => method_exists($response, 'getTraceToString') ? $response?->getTraceToString() : null
            ], $statusCode);
        }
    }

    /**
     * Send any success response
     *
     * @param string $message
     * @param array|object $data
     * @param integer $statusCode
     */
    public function success($message, $data = null, $statusCode = 200)
    {
        return $this->coreResponse($message, $data, $statusCode, true);
    }

    /**
     * Send any error response
     *
     * @param mixed $message
     * @param integer $statusCode
     */
    public function error($message, $statusCode = 500)
    {
        return $this->coreResponse($message, null, $statusCode, false);
    }
}
