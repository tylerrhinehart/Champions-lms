<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card dark class="primary">
                    <v-card-text>
                        <h3>Dashboard</h3>
                    </v-card-text>
                    <v-card-text>
                        <p>This will be the main hub for the user i.e. access courses, manage courses, etc.</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-title>Courses</v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-title>Student Stuff</v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-title>Other Stuff</v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {

            }
        }
    }
</script>