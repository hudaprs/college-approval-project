<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Constant
use App\Constants\RoleConstant;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->string('name', 100);
            $table->enum('role', RoleConstant::ROLE_LIST())->default(RoleConstant::CLIENT);
            $table->string('email', 100)->unique();
            $table->string('password', 255);
            $table->string('phone_number', 15)->unique()->nullable();
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
