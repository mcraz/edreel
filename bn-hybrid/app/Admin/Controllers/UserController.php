<?php

namespace App\Admin\Controllers;

use App\User;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\ModelForm;

class UserController extends Controller
{
    use ModelForm;

    /**
     * Index interface.
     *
     * @return Content
     */
    public function index()
    {
        return Admin::content(function (Content $content) {

            $content->header('Users');
            $content->description('list');

            $content->body($this->grid());
        });
    }

    /**
     * Edit interface.
     *
     * @param $id
     * @return Content
     */
    public function edit($id)
    {
        return Admin::content(function (Content $content) use ($id) {

            $content->header('Users');
            $content->description('edit');

            $content->body($this->form()->edit($id));
        });
    }

    /**
     * Create interface.
     *
     * @return Content
     */
    public function create()
    {
        return Admin::content(function (Content $content) {

            $content->header('Authorization');
            $content->description('Request');

            $content->body($this->form());
        });
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Admin::grid(User::class, function (Grid $grid) {

            $grid->id('ID')->sortable();

            $grid->column('name');
            $grid->column('network.name');

            $grid->created_at();
            $grid->updated_at();

            $grid->filter(function($filter){

                $filter->equal('network_id');

            });

            $grid->actions(function ($actions) {

                $actions->prepend('<a href=""><i class="fa fa-eye"></i> access</a>');

                $actions->disableDelete();
                $actions->disableEdit();

            });

        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Admin::form(User::class, function (Form $form) {
            $form->text('UID');
            $form->text('Access PIN');
        });

        return Admin::form(User::class, function (Form $form) {
            $form->display('id', 'ID');

            $form->text('name');
            $form->text('uidai', 'Aadhaar');
            $form->select('network_id');
        });

        return Admin::form(User::class, function (Form $form) {
            $form->display('id', 'ID');

            $form->text('name');
            $form->text('uidai', 'Aadhaar');
            $form->select('network_id');

            $form->display('created_at', 'Created At');
            $form->display('updated_at', 'Updated At');
        });
    }
}
