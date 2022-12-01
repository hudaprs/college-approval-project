<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use \App\Constants\ProjectTransactionConstant;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('created_by');
            $table->enum('status', ProjectTransactionConstant::PROJECT_TRANSACTION_STATUS_LIST())->default(ProjectTransactionConstant::PENDING);
            $table->string('reject_reason', 255)->nullable();
            $table->dateTime('approved_date')->nullable();
            $table->dateTime('rejected_date')->nullable();
            $table->json('active_project');
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('CASCADE');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_transactions');
    }
};
